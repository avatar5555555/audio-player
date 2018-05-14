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
    isSameTrack: false
  }

  componentDidMount() {
    this.props.fetchItems()
  }

  updateItem = newIndex => {
    const { items } = this.props

    if (newIndex >= items.length)
      return this.setState({ track: items[0], index: 0 })

    if (newIndex < 0)
      return this.setState({ track: items[items.length], index: items.length })

    this.setState({ track: items[newIndex], index: newIndex })
  }

  handleSelect = (track, index) => {
    const { track: currentTrack } = this.state
    const isSameTrack = currentTrack && currentTrack.trackId === track.trackId
    this.setState({ track, index, isSameTrack })
  }

  render() {
    const { items, isLoading, fetchItems } = this.props
    const { track, index, isSameTrack } = this.state
    const lastIndex = items.length - 1

    return (
      <Container>
        <Row>
          <Col xs={12} lg={{ size: 6, offset: 3 }}>
            <PlaybackCard
              {...track}
              onSubmit={fetchItems}
              index={index}
              updateItem={this.updateItem}
              lastIndex={lastIndex}
              isSameTrack={isSameTrack}
            />
            <PlayList
              items={items}
              selectTrack={this.handleSelect}
              isLoading={isLoading}
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
