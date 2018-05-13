import React from 'react'
import PropTypes from 'prop-types'
import ButtonGroup from 'reactstrap/lib/ButtonGroup'

import PlaybackButton from 'src/components/PlaybackButton'

const buttonTypes = ['backward', 'pause', 'play', 'forward']

const PlaybackControl = props => {
  const { isPlaying } = props

  return (
    <ButtonGroup>
      {buttonTypes.map(action => {
        const buttonIcon = isPlaying && action === 'play' ? 'stop' : action

        return (
          <PlaybackButton
            key={buttonIcon}
            name={buttonIcon}
            handleClick={props[action]}
          />
        )
      })}
    </ButtonGroup>
  )
}

PlaybackControl.propTypes = {
  isPlaying: PropTypes.bool.isRequired
}

export default PlaybackControl
