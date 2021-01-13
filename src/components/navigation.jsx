import React, { Component } from "react";

//Import from packages
import { Link } from "react-router-dom";

//Import Image
import logo from "../img/logo.png";

//Redux imports
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selector";
import { signoutCurrentUser } from "../redux/user/user.actions";

class Navigation extends Component {
  render() {
    const { currentUser, signoutCurrentUser } = this.props;
    return (
      <div className="nav">
        <div className="nav__background">&nbsp;</div>
        <Link className="nav-logo" to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div className="nav__navigation">
          <Link className="nav-link" to="/discover">
            Discover
          </Link>
          {currentUser ? (
            <div className="nav__navigation">
              <Link className="nav-link" to="/watchlist">
                Watch list
              </Link>
              <Link className="nav-link" to="/myshows">
                My Shows
              </Link>
              <span className="nav-link-text">
                Logged in to: {currentUser.name}{" "}
              </span>

              <div className="nav-link" onClick={() => signoutCurrentUser()}>
                SIGN OUT
              </div>
            </div>
          ) : (
            <Link className="nav-link" to="/signin">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signoutCurrentUser: () => dispatch(signoutCurrentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
