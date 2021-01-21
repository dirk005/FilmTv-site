import React, { Component } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selector";

import WatchListMovie from "../components/watch-list-movie";

class WatchListPage extends Component {
  constructor() {
    super();

    this.state = {
      movies: null,
    };
  }

  componentDidMount() {
    if (this.props.currentUser) {
      fetch(`http://localhost:8080/movie/movies`, {
        headers: {
          Authorization: `Bearer ${this.props.currentUser.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.movies);
          this.setState({ movies: res.movies });
        })
        .catch((err) => console.log(err));
    }
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="watch-list">
        <h1>My Watch List</h1>
        {movies ? (
          movies.map((movie, key) => <WatchListMovie key={key} movie={movie} />)
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(WatchListPage);
