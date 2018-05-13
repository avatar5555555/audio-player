import { getList, initialState } from './selectors'
import { ITEMS_SEARCH_REQUEST, ITEMS_SEARCH_SUCCESS } from './actions'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_SEARCH_REQUEST:
      return { ...state, list: [...getList(state)], isLoading: true }

    case ITEMS_SEARCH_SUCCESS:
      return { ...state, list: [...action.payload], isLoading: false }

    default:
      return state
  }
}

export default reducer
