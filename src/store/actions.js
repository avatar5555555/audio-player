// items list constants
export const ITEMS_SEARCH_REQUEST = 'ITEMS_SEARCH_REQUEST'
export const ITEMS_SEARCH_SUCCESS = 'ITEMS_SEARCH_SUCCESS'
export const ITEMS_SEARCH_FAILURE = 'ITEMS_SEARCH_FAILURE'

// items list action creators
export const itemsSearchRequest = payload => ({
  type: ITEMS_SEARCH_REQUEST,
  payload
})

export const itemsSearchSuccess = payload => ({
  type: ITEMS_SEARCH_SUCCESS,
  payload
})

export const itemsSearchFailure = () => ({
  type: ITEMS_SEARCH_FAILURE
})
