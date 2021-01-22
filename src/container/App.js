import React, { Component } from "react";

//import packages
import { Switch, Route, Redirect } from "react-router-dom";

//import components
import Navigation from "../components/navigation";

//import pages
import SignInAndSignUpPage from "../pages/sign-in-and-sign-up";
import HomePage from "../pages/home";
import DiscoverPage from "../pages/discover";
import WatchListPage from "../pages/watch-list";
import MyShowsPage from "../pages/my-shows";
import DetailsPage from "../pages/details-page";
import Loader from "../components/Loader";

//Redux imports
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selector";
import {
  getTopMovieStartAsync,
  getPopularMovieStartAsync,
  getUpcomingMovieStartAsync,
  getNowPlayingMovieStartAsync,
  getPopularTVStartAsync,
  getTopRatedTVStartAsync,
} from "../redux/moviedb/moviedb.actoins";
import { selectIsPending } from "../redux/moviedb/moviedb.selector";

class App extends Component {
  componentDidMount() {
    this.props.getTopMovieStartAsync();
    this.props.getPopularMovieStartAsync();
    this.props.getUpcomingMovieStartAsync();
    this.props.getNowPlayingMovieStartAsync();
    this.props.getPopularTVStartAsync();
    this.props.getTopRatedTVStartAsync();
  }
  render() {
    const { currentUser, isPending } = this.props;
    return (
      <div className="App">
        {isPending ? (
          <Loader />
        ) : (
          <div>
            <Navigation />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/discover" component={DiscoverPage} />
              <Route exact path="/watchlist" component={WatchListPage} />
              <Route exact path="/watchlist" component={MyShowsPage} />
              <Route path="/details-page" component={DetailsPage} />
              <Route
                exact
                path="/signin"
                render={() =>
                  currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
                }
              />
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
