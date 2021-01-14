//ADD SCROLL FOR MOVIES TO SCROLL HORIZONTALLY

import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import CardList from "./card-list";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectNowPlayingMovies,
  selectPopularMovies,
  selectPopularTv,
  selectTopRatedTv,
  selectUpcomingMovies,
} from "../redux/moviedb/moviedb.selector";

const Scroll = ({
  header,
  films,
  popularMovies,
  upcomingMovies,
  nowPlayingMovies,
  popularTv,
  topRatedTv,
}) => {
  console.log(films);
  return (
    <div>
      <h2 className="heading-secondary">{header} </h2>
      <ScrollContainer className="scroll-container">
        {console.log(upcomingMovies.reverse())}
        <CardList
          films={
            films === "popularMovies"
              ? popularMovies
              : films === "nowPlayingMovies"
              ? nowPlayingMovies
              : films === "upcomingMovies"
              ? upcomingMovies
              : films === "popularTv"
              ? popularTv
              : topRatedTv
          }
        />
      </ScrollContainer>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  upcomingMovies: selectUpcomingMovies,
  popularMovies: selectPopularMovies,
  nowPlayingMovies: selectNowPlayingMovies,
  popularTv: selectPopularTv,
  topRatedTv: selectTopRatedTv,
});

export default connect(mapStateToProps)(Scroll);
