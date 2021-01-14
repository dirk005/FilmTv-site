import { MoviedbActionTypes } from './moviebd.types';

export const getMoviedbStart = () => ({
  type: MoviedbActionTypes.REQUEST_MOVIEDB_START,
});

export const getMoviedbFailed = (err) => ({
  type: MoviedbActionTypes.REQUEST_MOVIEDB_FAILED,
  payload: err,
});

export const getTopMovieSuccess = (movies) => ({
  type: MoviedbActionTypes.REQUEST_TOP_MOVIES_SUCCESS,
  payload: movies,
});

export const getPopularMovieSuccess = (movies) => ({
  type: MoviedbActionTypes.REQUEST_POPULAR_MOVIES_SUCCESS,
  payload: movies,
});

export const getUpcomingMovieSuccess = (movies) => ({
  type: MoviedbActionTypes.REQUEST_UPCOMING_MOVIES_SUCCESS,
  payload: movies,
});

export const getNowPlayingMovieSuccess = (movies) => ({
  type: MoviedbActionTypes.REQUEST_NOWPLAYING_MOVIES_SUCCESS,
  payload: movies,
});
export const getPopularTVSuccess = (movies) => ({
  type: MoviedbActionTypes.REQUEST_POPULAR_TV_SUCCESS,
  payload: movies,
});
export const getTopRatedTVSuccess = (movies) => ({
  type: MoviedbActionTypes.REQUEST_TOP_RATED_TV_SUCCESS,
  payload: movies,
});

export const getTopMovieStartAsync = () => {
  return (dispatch) => {
    dispatch(getMoviedbStart());
    return fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=e88f04a0c3ba730c268e1240320d9aa8`
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(getTopMovieSuccess(data));
      })
      .catch((err) => dispatch(getMoviedbFailed(err.message)));
  };
};

export const getPopularMovieStartAsync = () => {
  return (dispatch) => {
    dispatch(getMoviedbStart());
    return fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=e88f04a0c3ba730c268e1240320d9aa8&language=en-US&page=2`
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(getPopularMovieSuccess(data));
      })
      .catch((err) => dispatch(getMoviedbFailed(err.message)));
  };
};

export const getUpcomingMovieStartAsync = () => {
  return (dispatch) => {
    dispatch(getMoviedbStart());
    return fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=e88f04a0c3ba730c268e1240320d9aa8`
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(getUpcomingMovieSuccess(data));
      })
      .catch((err) => dispatch(getMoviedbFailed(err.message)));
  };
};

export const getNowPlayingMovieStartAsync = () => {
  return (dispatch) => {
    dispatch(getMoviedbStart());
    return fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=e88f04a0c3ba730c268e1240320d9aa8&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(getNowPlayingMovieSuccess(data));
      })
      .catch((err) => dispatch(getMoviedbFailed(err.message)));
  };
};

export const getPopularTVStartAsync = () => {
  return (dispatch) => {
    dispatch(getMoviedbStart());
    return fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=e88f04a0c3ba730c268e1240320d9aa8&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(getPopularTVSuccess(data));
      })
      .catch((err) => dispatch(getMoviedbFailed(err.message)));
  };
};

export const getTopRatedTVStartAsync = () => {
  return (dispatch) => {
    dispatch(getMoviedbStart());
    return fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=e88f04a0c3ba730c268e1240320d9aa8&language=en-US&page=20`
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(getTopRatedTVSuccess(data));
      })
      .catch((err) => dispatch(getMoviedbFailed(err.message)));
  };
};
