import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { List, Spinner } from 'src/components'

class PlayList extends Component {
  handleSelect = id => {
    let index
    const selectedTrack = this.props.items.find((item, i) => {
      if (item.trackId === id) {
        index = i
        return true
      }

      return false
    })

    this.props.selectTrack(selectedTrack, index)
  }

  render() {
    const { items, isLoading, currentTrackId } = this.props

    return isLoading ? (
      <Spinner />
    ) : (
      <List
        items={items}
        onSelect={this.handleSelect}
        currentTrackId={currentTrackId}
      />
    )
  }
}

PlayList.propTypes = {
  items: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  selectTrack: PropTypes.func.isRequired,
  currentTrackId: PropTypes.string
}

PlayList.defaultProps = {
  items: [],
  currentTrackId: ''
}

export default PlayList
