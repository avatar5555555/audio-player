import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InputGroup from 'reactstrap/lib/InputGroup'
import InputGroupAddon from 'reactstrap/lib/InputGroupAddon'
import Button from 'reactstrap/lib/Button'
import Input from 'reactstrap/lib/Input'
import Form from 'reactstrap/lib/Form'
import { FormattedMessage } from 'react-intl'

class SearchBar extends Component {
  state = {
    value: ''
  }

  handleChange = e => {
    this.setState({ value: e.target.value })
  }
  handleSubmit = e => {
    e.preventDefault()

    this.props.onSubmit(this.state.value)
  }

  render() {
    const { value } = this.state
    return (
      <Form onSubmit={this.handleSubmit} className="mb-5 mt-2">
        <InputGroup>
          <Input value={value} onChange={this.handleChange} />
          <InputGroupAddon addonType="append">
            <Button>
              <FormattedMessage id="search" />{' '}
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    )
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default SearchBar
