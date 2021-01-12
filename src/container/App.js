import React from 'react';

//import packages
import { Switch, Route, Redirect } from "react-router-dom";

//import components
import Navigation from '../components/navigation';

//import pages
import SignInAndSignUpPage from '../pages/sign-in-and-sign-up';
import HomePage from '../pages/home';
import DiscoverPage from '../pages/discover';
import WatchListPage from '../pages/watch-list';
import MyShowsPage from '../pages/my-shows';



const  App = ({currentUser}) => {
  return (
    <div className="App">
    <Navigation/>
    <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/discover" component={DiscoverPage} />
    <Route exact path="/watchlist" component={WatchListPage} />
    <Route exact path="/watchlist" component={MyShowsPage} />
    <Route
      exact
      path="/signin"
      render={() =>
        currentUser ? (
          <Redirect to="/" />
        ) : (
          <SignInAndSignUpPage />
        )
      }
    />
  </Switch>

    </div>
  );
}

export default App;
