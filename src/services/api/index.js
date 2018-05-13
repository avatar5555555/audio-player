import 'whatwg-fetch'
import { stringify } from 'query-string'
import merge from 'lodash/merge'

import config from 'src/config'

const { basePath } = config

const parseJSON = response => response.json()

const parseSettings = ({
  method = 'get',
  data,
  locale,
  ...otherSettings
} = {}) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': locale
  }

  const settings = merge(
    {
      body: data ? JSON.stringify(data) : undefined,
      method,
      headers
    },
    otherSettings
  )

  return settings
}

const parseEndpoint = (endpoint, params) => {
  const url = endpoint ? basePath + endpoint : basePath
  const queryString = params ? `?${stringify(params)}` : ''

  return `${url}${queryString}`
}

const handleError = error => console.log(error)

const api = {}

api.request = (endpoint, { params, ...settings } = {}) => {
  return fetch(parseEndpoint(endpoint, params), parseSettings(settings)).then(
    parseJSON,
    handleError
  )
}

export default api
