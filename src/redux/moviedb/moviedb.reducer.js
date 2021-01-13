import { MoviedbActionTypes } from "./moviebd.types";

const INITIAL_STATE = {
  topMovies: null,
  isPending: false,
  errorMessage: undefined,
};

const moviedbReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MoviedbActionTypes.REQUEST_TOP_MOVIES_START:
      return {
        ...state,
        isPending: true,
      };
    case MoviedbActionTypes.REQUEST_TOP_MOVIES_SUCCESS:
      return {
        ...state,
        isPending: false,
        topMovies: action.payload,
      };
    case MoviedbActionTypes.REQUEST_TOP_MOVIES_FAILED:
      return {
        ...state,
        isPending: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default moviedbReducer;
