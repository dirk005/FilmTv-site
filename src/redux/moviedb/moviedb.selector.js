import { createSelector } from 'reselect';

const selectMoviedb = (state) => state.moviedb;

export const selectTopMovies = createSelector(
    [selectMoviedb],
    (moviedb) => moviedb.topMovies.results
);