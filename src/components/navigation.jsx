import React from "react";

//Import from packages
import { Link } from "react-router-dom";

//Import Image
import logo from "../img/logo.png";

const Navigation = ({ currentUser }) => (
  <div className="nav">
    <Link className="nav-logo" to="/">
      <img  src={logo} alt="logo" />
    </Link>
    <div className="nav__navigation">
      <Link className="nav-link" to="/discover">
        Discover
      </Link>
      {currentUser ? (
        <div>
          <Link className="nav-link" to="/watchlist">
            Watch list
          </Link>
          <Link className="nav-link" to="/myshows">
            My Shows
          </Link>
          <div className="nav-link" onClick={() => "signOut()"}>
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

export default Navigation;
