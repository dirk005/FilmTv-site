import { MoviedbActionTypes } from "./moviebd.types";

export const getTopMovieStart = () => ({
  type: MoviedbActionTypes.REQUEST_TOP_MOVIES_START,
});

export const getTopMovieSuccess = (movies) => ({
  type: MoviedbActionTypes.REQUEST_TOP_MOVIES_SUCCESS,
  payload: movies,
});

export const getTopMovieFailed = (err) => ({
  type: MoviedbActionTypes.REQUEST_TOP_MOVIES_FAILED,
  payload: err,
});

export const getTopMovieStartAsync = () => {
    console.log('in action')
  return (dispatch) => {
      
    dispatch(getTopMovieStart());
    return fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=e88f04a0c3ba730c268e1240320d9aa8`
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(getTopMovieSuccess(data));
      })
      .catch((err) => dispatch(getTopMovieFailed(err.message)));
  };
};
