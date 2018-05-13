import React, { Component } from 'react'
import PropTypes from 'prop-types'

import List from 'src/components/List'
import Spinner from 'src/components/Spinner'

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
    const { items, isLoading } = this.props

    return isLoading ? (
      <Spinner />
    ) : (
      <List items={items} onSelect={this.handleSelect} />
    )
  }
}

PlayList.propTypes = {
  items: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  selectTrack: PropTypes.func.isRequired
}

PlayList.defaultProps = {
  items: []
}

export default PlayList
