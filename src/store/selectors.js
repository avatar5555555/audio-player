export const initialState = {
  isLoading: false,
  list: []
}

export const getList = (state = initialState) => state.list

export const getIsLoading = (state = initialState) => state.isLoading
