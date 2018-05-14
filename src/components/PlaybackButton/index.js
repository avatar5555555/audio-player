import React from 'react'
import PropTypes from 'prop-types'
import Button from 'reactstrap/lib/Button'

import Icon from 'src/components/Icon'

const PlaybackButton = ({ handleClick, name }) => (
  <Button onClick={handleClick}>
    <Icon name={name} />
  </Button>
)

PlaybackButton.propTypes = {
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default PlaybackButton
