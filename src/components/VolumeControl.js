import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Progress from 'reactstrap/lib/Progress'
import Button from 'reactstrap/lib/Button'

import Icon from './Icon'

import config from 'src/config'

const StyledProgress = styled(Progress)`
  width: 100%;
  height: 30px;
  cursor: pointer;
  margin-right: 5px;
`

const Root = styled.div`
  display: flex;
  flex: 1;
  margin-right: 5px;
`

class VolumeControl extends Component {
  updateVolume = e => {
    const elementWidth = document.getElementById('volume').offsetWidth
    const newLevel = Math.round(e.nativeEvent.offsetX / elementWidth * 10) / 10

    this.props.volumeChange(newLevel)
  }

  render() {
    const { mute, isMuted, volume } = this.props

    return (
      <Root>
        <StyledProgress
          id="volume"
          max={config.maxVolume}
          value={volume}
          onClick={this.updateVolume}
        />
        <Button onClick={mute}>
          <Icon name={isMuted ? 'cross' : 'volume'} />
        </Button>
      </Root>
    )
  }
}
VolumeControl.propTypes = {
  mute: PropTypes.func.isRequired,
  isMuted: PropTypes.bool.isRequired,
  volume: PropTypes.number,
  volumeChange: PropTypes.func.isRequired
}

VolumeControl.defaultProps = {
  volume: 0
}

export default VolumeControl
