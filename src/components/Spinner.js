import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const View = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  .spinner {
    display: inline-block;
    width: ${p => (p.small ? '64px' : '128px')};
    height: ${p => (p.small ? '64px' : '128px')};
  }
  .spinner:after {
    content: ' ';
    display: block;
    width: ${p => (p.small ? '64px' : '128px')};
    height: ${p => (p.small ? '64px' : '128px')};
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #007bff;
    border-color: #007bff transparent #007bff transparent;
    animation: spinner 1.2s linear infinite;
  }
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Spinner = ({ small, ...rest }) => (
  <View small={small} {...rest}>
    <div className="spinner" />
  </View>
)

Spinner.propTypes = {
  small: PropTypes.bool
}

Spinner.defaultProps = {
  small: false
}

export default Spinner
