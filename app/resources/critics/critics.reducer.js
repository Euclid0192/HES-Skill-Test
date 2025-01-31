import { CRITICS_FETCH_SUCCESS, CRITICS_FETCH_REQUEST, CRITICS_FETCH_FAILURE } from "./critics.actions"

const initialState = {
  critics: [],
  loading: false,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CRITICS_FETCH_REQUEST:
      return { ...state, loading: true, error: null }

    case CRITICS_FETCH_SUCCESS:
      return { ...state, loading: false, critics: action.payload }

    case CRITICS_FETCH_FAILURE:
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}
