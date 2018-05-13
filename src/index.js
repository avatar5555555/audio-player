import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'

import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import store from 'src/store'
import config from 'src/config'
import en from 'src/i18n'

const { locale } = config

const renderApp = () => (
  <IntlProvider locale={locale} messages={en}>
    <Provider store={store}>
      <App />
    </Provider>
  </IntlProvider>
)

const root = document.getElementById('root')

render(renderApp(), root)

if (module.hot) {
  module.hot.accept('./App', () => {
    require('./App')
    render(renderApp(), root)
  })
}

registerServiceWorker()
