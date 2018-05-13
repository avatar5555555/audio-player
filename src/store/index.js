import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducers from './reducers'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

let devTool
if (process.env.NODE_ENV === `development`) {
  devTool =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
}

const store = createStore(reducers, devTool, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(sagas)

export default store
