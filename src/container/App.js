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

//Redux imports
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selector";
import { setCurrentUser } from "../redux/user/user.actions";

class App extends Component {
  componentDidMount() {
    const { setCurrentUser } = this.props;
  }
  render() {
    const { currentUser } = this.props;
    console.log(currentUser)
    return (
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/discover" component={DiscoverPage} />
          <Route exact path="/watchlist" component={WatchListPage} />
          <Route exact path="/watchlist" component={MyShowsPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
