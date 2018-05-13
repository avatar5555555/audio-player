import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const icons = {
  play: require('./icons/Play').default,
  pause: require('./icons/Pause').default,
  forward: require('./icons/Forward').default,
  backward: require('./icons/Backward').default,
  volume: require('./icons/Volume').default,
  cross: require('./icons/Cross').default,
  cd: require('./icons/Cd').default,
  stop: require('./icons/Stop').default
}

const IconRoot = styled.div`
  width: ${p => (p.small ? '15px' : '100px')};
  height: ${p => (p.small ? '15px' : '100px')};
`
const Icon = ({ name, small }) => {
  const Component = icons[name]

  return name ? (
    <IconRoot small={small}>
      <Component className="d-flex" />
    </IconRoot>
  ) : null
}

Icon.propTypes = {
  name: PropTypes.string,
  small: PropTypes.bool
}

Icon.defaultProps = {
  name: '',
  small: true
}

export default Icon
