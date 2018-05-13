import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import PlaybackControl from 'src/components/PlaybackControl'
import VolumeControl from 'src/components/VolumeControl'
import Icon from 'src/components/Icon'
import Playback from 'src/components/Playback'
import SearchBar from 'src/components/SearchBar'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  img {
    width: 100px;
    height: 100px;
  }

  audio {
    width: 100%;
  }
`

const ControlsRoot = styled.div`
  display: flex;
  margin: 10px 0;
`

const Text = styled.div`
  display: flex;
  flex: 1;
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  justify-content: center;
  margin-left: 10px;
  white-space: wrap;
`

const InfoRoot = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

class PlaybackCard extends Component {
  state = {
    volumeLevel: 0,
    isMuted: false,
    isPlaying: false,
    currentTime: 0,
    timerId: null
  }

  componentDidMount() {
    this.setState({ volumeLevel: this.audioRef.volume })
  }

  getSnapshotBeforeUpdate(prevProps) {
    if (prevProps.trackId !== this.props.trackId) {
      return true
    }

    return null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      return this.setState({ isPlaying: false }, () => this.handlePlay())
    }
  }

  audioRef

  handlePlay = () => {
    const { isPlaying, timerId } = this.state
    const { index } = this.props
    const setPlayTimer = () =>
      setInterval(
        () => this.setState({ currentTime: this.audioRef.currentTime }),
        300
      )

    if (index == null) return

    // emulate stop since there's no suitable method
    if (isPlaying) {
      this.audioRef.pause()
      this.audioRef.currentTime = 0
      clearInterval(timerId)
      return this.setState({ isPlaying: false, currentTime: 0 })
    }

    this.audioRef.play()
    this.setState({ isPlaying: true, timerId: setPlayTimer() })
  }

  handlePause = () => {
    const { timerId } = this.state

    this.audioRef.pause()
    clearInterval(timerId)
    this.setState({ isPlaying: false })
  }

  handleForward = () => {
    const { index, updateItem } = this.props
    updateItem(index + 1)
  }

  handleForward = () => {
    const { index, updateItem } = this.props

    // use implicit coercion since it checks if index is null or undefined
    const newIndex = index == null ? 0 : index + 1
    updateItem(newIndex)
  }

  handleBackward = () => {
    const { index, updateItem, lastIndex } = this.props

    const newIndex = !Boolean(index) ? lastIndex : index - 1

    updateItem(newIndex)
  }

  updateVolume = volume => {
    if (typeof volume === 'number' && volume !== this.audioRef.volume) {
      this.audioRef.volume = volume
      this.setState({ volumeLevel: volume })
    }
  }

  handleMute = () => {
    this.audioRef.muted = !this.audioRef.muted
    this.setState({ isMuted: this.audioRef.muted })
  }

  handleSeeked = time => {
    this.audioRef.currentTime = time
    this.setState({ currentTime: time })
  }

  render() {
    const {
      artworkUrl100,
      previewUrl,
      artistName,
      trackName,
      onSubmit
    } = this.props

    const { volumeLevel, isMuted, isPlaying, currentTime } = this.state

    const duration =
      this.audioRef && this.audioRef.duration ? this.audioRef.duration : 0

    return (
      <Root>
        <audio src={previewUrl} ref={ref => (this.audioRef = ref)} />
        <InfoRoot>
          {artworkUrl100 ? (
            <img src={artworkUrl100} alt="album" />
          ) : (
            <Icon name="cd" small={false} />
          )}
          <Text>{artistName && `${artistName} - ${trackName}`}</Text>
        </InfoRoot>

        <ControlsRoot>
          <VolumeControl
            volume={volumeLevel}
            volumeChange={this.updateVolume}
            isMuted={isMuted}
            mute={this.handleMute}
          />
          <PlaybackControl
            play={this.handlePlay}
            pause={this.handlePause}
            forward={this.handleForward}
            backward={this.handleBackward}
            isPlaying={isPlaying}
          />
        </ControlsRoot>

        <Playback
          timeSeeked={this.handleSeeked}
          duration={duration}
          currentTime={currentTime}
        />
        <SearchBar onSubmit={onSubmit} />
      </Root>
    )
  }
}

PlaybackCard.propTypes = {
  artworkUrl100: PropTypes.string,
  previewUrl: PropTypes.string,
  artistName: PropTypes.string,
  trackName: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  index: PropTypes.number,
  updateItem: PropTypes.func.isRequired,
  lastIndex: PropTypes.number
}

PlaybackCard.defaultProps = {
  artworkUrl100: '',
  previewUrl: '',
  artistName: '',
  trackName: '',
  index: null,
  lastIndex: 0
}

export default PlaybackCard
