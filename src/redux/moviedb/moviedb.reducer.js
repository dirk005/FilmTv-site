import { MoviedbActionTypes } from './moviebd.types';

const INITIAL_STATE = {
  nowPlayingMovies: null,
  upcomingMovies: null,
  topMovies: null,
  popularMovies: null,
  popularTv: null,
  topRatedTv:null,
  isPending: false,
  errorMessage: undefined,
};

const moviedbReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MoviedbActionTypes.REQUEST_MOVIEDB_START:
      return {
        ...state,
        isPending: true,
      };
    case MoviedbActionTypes.REQUEST_TOP_MOVIES_SUCCESS:
      return {
        ...state,
        // isPending: false,
        topMovies: action.payload,
      };
    case MoviedbActionTypes.REQUEST_POPULAR_MOVIES_SUCCESS:
      return {
        ...state,
        // isPending: false,
        popularMovies: action.payload,
      };
    case MoviedbActionTypes.REQUEST_UPCOMING_MOVIES_SUCCESS:
      return {
        ...state,
        // isPending: false,
        upcomingMovies: action.payload,
      };
    case MoviedbActionTypes.REQUEST_NOWPLAYING_MOVIES_SUCCESS:
      return {
        ...state,
        // isPending: false,
        nowPlayingMovies: action.payload,
      };
    case MoviedbActionTypes.REQUEST_POPULAR_TV_SUCCESS:
      return {
        ...state,
        isPending: false,
        popularTv: action.payload,
      };
    case MoviedbActionTypes.REQUEST_TOP_RATED_TV_SUCCESS:
      return {
        ...state,
        isPending: false,
        topRatedTv: action.payload,
      };
    case MoviedbActionTypes.REQUEST_MOVIEDB_FAILED:
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
