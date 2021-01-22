import React, { Component } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selector";

import WatchListMovie from "../components/watch-list-movie";

class WatchListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: null,
      selectedOption: "all",
      displayMovies: null,
    };
  }
  componentDidMount() {
    this.handleGetDetails();
  }

  handleGetDetails = () => {
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
          this.setState({ movies: res.movies, displayMovies: res.movies });
        })
        .catch((err) => console.log(err));
    }
  };

  handleOptionChange = (event) => {
    const selectedOption = event.target.value;

    const displayMovies = this.state.movies.filter(
      (movie) =>
        selectedOption === "watched"
          ? movie.watched === true // return watched movies
          : selectedOption === "toWatch"
          ? movie.watched === false // return movies to watch
          : true // return all movies
    );

    this.setState({
      selectedOption: selectedOption,
      displayMovies: displayMovies,
    });
  };

  render() {
    const { displayMovies, selectedOption } = this.state;
    return (
      <div className="watch-list">
        <h2 className="heading-secondary">My Watch List</h2>
        <div>
          <input
            type="radio"
            value="all"
            name="all"
            checked={selectedOption === "all"}
            onChange={this.handleOptionChange}
          />{" "}
          All
          <input
            type="radio"
            value="watched"
            name="watched"
            checked={selectedOption === "watched"}
            onChange={this.handleOptionChange}
          />{" "}
          Watched
          <input
            type="radio"
            value="toWatch"
            name="toWatch"
            checked={selectedOption === "toWatch"}
            onChange={this.handleOptionChange}
          />{" "}
          To Watch
        </div>
        <div className="watch-list__box">
          {displayMovies ? (
            displayMovies.map((movie, key) => {
              return <WatchListMovie key={key} movie={movie} />;
            })
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(WatchListPage);
