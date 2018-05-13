import * as actions from './actions'

import { put, call, takeEvery } from 'redux-saga/effects'
import api from 'src/services/api'
import config from 'src/config'

const fetchItemsList = function*({ payload }) {
  try {
    const { query } = payload
    const response = yield call(api.request, '/search', {
      params: { term: query, media: config.mediaType }
    })

    yield put(actions.itemsSearchSuccess(response.results))
  } catch (error) {
    yield put(actions.itemsSearchFailure())
  }
}

const run = function*() {
  yield takeEvery(actions.ITEMS_SEARCH_REQUEST, fetchItemsList)
}

export default run
