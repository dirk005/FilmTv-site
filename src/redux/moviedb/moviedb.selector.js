import { createSelector } from "reselect";

const selectMoviedb = (state) => state.moviedb;

//select top movies
export const selectTopMovies = createSelector([selectMoviedb], (moviedb) =>
  moviedb.topMovies ? moviedb.topMovies.results : {}
);

//select popular movies
export const selectPopularMovies = createSelector([selectMoviedb], (moviedb) =>
  moviedb.popularMovies ? moviedb.popularMovies.results : {}
);

//select upcoming movies
export const selectUpcomingMovies = createSelector([selectMoviedb], (moviedb) =>
  moviedb.upcomingMovies ? moviedb.upcomingMovies.results : {}
);
//select nowPlaying movies
export const selectNowPlayingMovies = createSelector(
  [selectMoviedb],
  (moviedb) =>
    moviedb.nowPlayingMovies ? moviedb.nowPlayingMovies.results : {}
);

//select Popular Tv
export const selectPopularTv = createSelector([selectMoviedb], (moviedb) =>
  moviedb.popularTv ? moviedb.popularTv.results : {}
);

//select Top Rated Tv
export const selectTopRatedTv = createSelector([selectMoviedb], (moviedb) =>
  moviedb.topRatedTv ? moviedb.topRatedTv.results : {}
);

//select is pending
export const selectIsPending = createSelector(
  [selectMoviedb],
  (moviedb) => moviedb.isPending
);
