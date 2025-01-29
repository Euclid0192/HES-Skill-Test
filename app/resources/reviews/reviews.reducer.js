import { REVIEWS_FETCH_SUCCESS, REVIEWS_FETCH_REQUEST, REVIEWS_FETCH_FAILURE } from "./reviews.actions"

const initialState = {
  data: [],
  loading: false,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REVIEWS_FETCH_REQUEST:
      return { ...state, loading: true, error: null }

    case REVIEWS_FETCH_SUCCESS:
      return { ...state, loading: false, data: action.payload }

    case REVIEWS_FETCH_FAILURE:
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}
