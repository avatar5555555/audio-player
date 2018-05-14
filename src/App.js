import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Container from 'reactstrap/lib/Container'
import Row from 'reactstrap/lib/Row'
import Col from 'reactstrap/lib/Col'

import PlayList from 'src/containers/PlayList'
import PlaybackCard from 'src/containers/PlaybackCard'
import { itemsSearchRequest } from 'src/store/actions'
import { getList, getIsLoading } from 'src/store/selectors'

export class App extends Component {
  state = {
    track: null,
    index: null,
    isPlaying: false,
    timerId: null,
    currentTime: 0,
    volumeLevel: 0,
    isMuted: false
  }

  componentDidMount() {
    this.props.fetchItems()

    // save volume level to show it on page
    this.setState({ volumeLevel: this.audioRef.current.volume })

    // When the file has finished playing to the end start next track
    this.audioRef.current.addEventListener('ended', () => {
      this.handleForward()
    })
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (
      prevState.track &&
      prevState.track.trackId !== this.state.track.trackId
    ) {
      return true
    }

    return null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if current track is new - stop previous playing and start new track
    if (snapshot) {
      return this.setState({ isPlaying: false }, () => this.handlePlay())
    }
  }

  audioRef = React.createRef()

  updateItem = newIndex => {
    const { items } = this.props

    // if forwarding from last track - play the first track
    if (newIndex >= items.length)
      return this.setState({ track: items[0], index: 0 })

    // if backward from first track - play the last track
    if (newIndex < 0)
      return this.setState({ track: items[items.length], index: items.length })

    this.setState({ track: items[newIndex], index: newIndex })
  }

  handleSelect = (track, index) => {
    const { track: currentTrack, isPlaying } = this.state
    const isSameTrack = currentTrack && currentTrack.trackId === track.trackId

    // if track the same track and it playing - pause
    if (isSameTrack && isPlaying) {
      return this.handlePause()
    }

    // otherwise set new track and play it
    this.setState({ track, index }, () => this.handlePlay())
  }

  handlePlay = () => {
    const { isPlaying, timerId, index } = this.state

    // save ref's currentTime in state to render it's value
    const setPlayTimer = () =>
      setInterval(
        () => this.setState({ currentTime: this.audioRef.current.currentTime }),
        300
      )

    // check if index and track set
    if (index == null) return

    // emulate stop since there's no suitable method
    if (isPlaying) {
      this.audioRef.current.pause()
      this.audioRef.current.currentTime = 0
      clearInterval(timerId)
      return this.setState({ isPlaying: false, currentTime: 0 })
    }

    this.audioRef.current.play()
    this.setState({ isPlaying: true, timerId: setPlayTimer() })
  }

  handlePause = () => {
    const { timerId } = this.state

    // pause playing and reset timer
    this.audioRef.current.pause()
    clearInterval(timerId)
    this.setState({ isPlaying: false })
  }

  handleForward = () => {
    const { index } = this.state

    // use implicit coercion since it checks if index is null or undefined
    const newIndex = index == null ? 0 : index + 1
    this.updateItem(newIndex)
  }

  handleBackward = () => {
    const { items } = this.props
    const { index } = this.state
    const lastIndex = items.length - 1

    const newIndex = !Boolean(index) ? lastIndex : index - 1

    this.updateItem(newIndex)
  }

  handleVolume = volume => {
    if (typeof volume === 'number' && volume !== this.audioRef.current.volume) {
      this.audioRef.current.volume = volume
      this.setState({ volumeLevel: volume })
    }
  }

  handleMute = () => {
    this.audioRef.current.muted = !this.audioRef.current.muted
    this.setState({ isMuted: this.audioRef.current.muted })
  }

  handleSeeked = time => {
    this.audioRef.current.currentTime = time
    this.setState({ currentTime: time })
  }

  render() {
    const { items, isLoading, fetchItems } = this.props
    const { track, volumeLevel, currentTime, isMuted, isPlaying } = this.state

    const currentUrl = track ? track.previewUrl : ''
    const currentTrackId = track ? track.trackId : ''
    const duration =
      this.audioRef && this.audioRef.current && this.audioRef.current.duration
        ? this.audioRef.current.duration
        : 0

    return (
      <Container>
        <Row>
          <Col xs={12} lg={{ size: 6, offset: 3 }}>
            <audio src={currentUrl} ref={this.audioRef} />
            <PlaybackCard
              {...track}
              duration={duration}
              volumeLevel={volumeLevel}
              currentTime={currentTime}
              isMuted={isMuted}
              isPlaying={isPlaying}
              mute={this.handleMute}
              play={this.handlePlay}
              pause={this.handlePause}
              forward={this.handleForward}
              backward={this.handleBackward}
              seeked={this.handleSeeked}
              volume={this.handleVolume}
              onSubmit={fetchItems}
            />
            <PlayList
              items={items}
              selectTrack={this.handleSelect}
              isLoading={isLoading}
              currentTrackId={currentTrackId}
            />
          </Col>
        </Row>
      </Container>
    )
  }
}

App.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
}

const mapState = state => ({
  items: getList(state),
  isLoading: getIsLoading(state)
})

const bindActions = dispatch => ({
  fetchItems: (query = 'jack') => dispatch(itemsSearchRequest({ query })) // 'common' american name for initial fulfil
})

export default connect(mapState, bindActions)(App)
