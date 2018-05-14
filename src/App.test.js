import React from 'react'
import ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'

import { App } from './App'

import config from 'src/config'
import en from 'src/i18n'

const fakeProps = {
  fetchItems: () => {},
  items: [],
  isLoading: false,
  intl: {}
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <IntlProvider locale={config.locale} messages={en}>
      <App {...fakeProps} />
    </IntlProvider>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
