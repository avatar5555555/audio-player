import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Progress from 'reactstrap/lib/Progress'
import Badge from 'reactstrap/lib/Badge'

import { getTrackDuration } from 'src/services/time'

const Root = styled.div`
  display: flex;
`

const StyledProgress = styled(Progress)`
  width: 100%;
  height: 30px;
  cursor: pointer;
`

const StyledBadge = styled(Badge)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 83px;
  margin-left: 5px;
`

class Playback extends Component {
  updateTime = e => {
    const { duration, timeSeeked } = this.props
    const elementWidth = document.getElementById('time').offsetWidth

    const newTime =
      duration * Math.round(e.nativeEvent.offsetX / elementWidth * 10) / 10

    timeSeeked(newTime)
  }
  render() {
    const { duration, currentTime } = this.props
    return (
      <Root>
        <StyledProgress
          id="time"
          onClick={this.updateTime}
          max={duration}
          value={currentTime}
        />
        <StyledBadge>{`${getTrackDuration(
          currentTime,
          'seconds'
        )}/${getTrackDuration(duration, 'seconds')}`}</StyledBadge>
      </Root>
    )
  }
}

Playback.propTypes = {
  duration: PropTypes.number,
  currentTime: PropTypes.number,
  timeSeeked: PropTypes.func.isRequired
}

Playback.defaultProps = {
  duration: 0,
  currentTime: 0
}

export default Playback
