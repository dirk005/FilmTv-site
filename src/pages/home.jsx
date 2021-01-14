import React, { Component } from "react";

import HeaderSlide from "../components/header-slide";
import ScrollContainer from "../container/scroll-container";

import { connect } from "react-redux";
import {
  getTopMovieStartAsync,
  getPopularMovieStartAsync,
  getUpcomingMovieStartAsync,
  getNowPlayingMovieStartAsync,
  getPopularTVStartAsync,
  getTopRatedTVStartAsync,
} from "../redux/moviedb/moviedb.actoins";
import { createStructuredSelector } from "reselect";
import { selectIsPending } from "../redux/moviedb/moviedb.selector";

import Loader from "../components/Loader.js";

class HomePage extends Component {
  componentDidMount() {
    this.props.getTopMovieStartAsync();
    this.props.getPopularMovieStartAsync();
    this.props.getUpcomingMovieStartAsync();
    this.props.getNowPlayingMovieStartAsync();
    this.props.getPopularTVStartAsync();
    this.props.getTopRatedTVStartAsync();
  }
  render() {
    const { isPeding } = this.props;
    return (
      <div className="homePage">
        {isPeding ? (
          <Loader />
        ) : (
          <>
            <HeaderSlide />
            <ScrollContainer />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isPending: selectIsPending,
});

const mapDispatchToProps = (dispatch) => ({
  getTopMovieStartAsync: () => dispatch(getTopMovieStartAsync()),
  getPopularMovieStartAsync: () => dispatch(getPopularMovieStartAsync()),
  getUpcomingMovieStartAsync: () => dispatch(getUpcomingMovieStartAsync()),
  getNowPlayingMovieStartAsync: () => dispatch(getNowPlayingMovieStartAsync()),
  getPopularTVStartAsync: () => dispatch(getPopularTVStartAsync()),
  getTopRatedTVStartAsync: () => dispatch(getTopRatedTVStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
