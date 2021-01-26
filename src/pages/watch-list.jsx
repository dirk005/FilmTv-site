import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selector";

import WatchListMovie from "../components/watch-list-movie";
import WatchListTv from "../components/watch-list-tv";
import CustomButton from "../components/custom-button";

class WatchListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: null,
      tv: null,
      selectedOption: "all",
      selectedType: "movie",
      displayMovies: null,
      displayShow: null,
    };
  }
  componentDidMount() {
    this.handleGetMovieDetails();
    this.handleGetTvDetails();
  }

  handleGetMovieDetails = () => {
    if (this.props.currentUser) {
      let url = 'https://floating-journey-19460.herokuapp.com';
      if (process.env.NODE_ENV === 'development'){
        url = 'http://localhost:8080'
    }
      fetch(`${url}/movie/movies`, {
        headers: {
          Authorization: `Bearer ${this.props.currentUser.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.movies) {
            return this.setState({ tv: null, displayShow: null });
          }
          if (Array.isArray(res.movies)) {
            if (res.movies.length === 0) {
              return this.setState({ tv: null, displayShow: null });
            }
          }
          this.setState({ movies: res.movies, displayMovies: res.movies });
        })
        .catch((err) => console.log(err));
    }
  };

  handleGetTvDetails = () => {
    if (this.props.currentUser) {
      let url = 'https://floating-journey-19460.herokuapp.com';
      if (process.env.NODE_ENV === 'development'){
        url = 'http://localhost:8080'
    }
      fetch(`${url}/show/shows`, {
        headers: {
          Authorization: `Bearer ${this.props.currentUser.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.shows) {
            return this.setState({ tv: null, displayShow: null });
          }
          if (Array.isArray(res.shows)) {
            if (res.shows.length === 0) {
              return this.setState({ tv: null, displayShow: null });
            }
          }

          this.setState({ tv: res.shows, displayShow: res.shows });
        })
        .catch((err) => console.log(err));
    }
  };

  handleOptionChange = (event) => {
    const selectedOption = event.target.value;

    const displayMovies = this.state.movies.filter(
      (movie) =>
        selectedOption === "watched"
          ? movie.watched === true // return watched shows
          : selectedOption === "toWatch"
          ? movie.watched === false // return show to watch
          : true // return all shows
    );

    this.setState({
      selectedOption: selectedOption,
      displayMovies: displayMovies,
    });
  };

  handleTypeChange = (event) => {
    const selectedType = event.target.value;

    this.setState({
      selectedType: selectedType,
    });
  };
  render() {
    const {
      displayMovies,
      selectedOption,
      selectedType,
      displayShow,
    } = this.state;
    const { history } = this.props;

    return (
      <div className="watch-list">
        <h2 className="heading-secondary">My Watch List</h2>
        <div>
          <h3 className="heading-tertiary">Filter</h3>
          <div className="watch-list-selections">
            <div class="checkbox">
              <input
                type="checkbox"
                value="movie"
                id="checkboxMovie"
                name="movie"
                checked={selectedType === "movie"}
                onChange={this.handleTypeChange}
              />
              <label for="checkboxMovie"></label>
            </div>
            <span>Movie</span>

            <div class="checkbox">
              <input
                type="checkbox"
                value="tv"
                id="checkboxTv"
                name="tv"
                checked={selectedType === "tv"}
                onChange={this.handleTypeChange}
              />
              <label for="checkboxTv"></label>
            </div>
            <span>Series</span>
          </div>
        </div>
        {selectedType === "movie" ? (
          <div className="watch-list-selections">
            <div class="checkbox">
              <input
                type="checkbox"
                value="all"
                id="checkboxAll"
                name="all"
                checked={selectedOption === "all"}
                onChange={this.handleOptionChange}
              />
              <label for="checkboxAll"></label>
            </div>
            <span>All</span>

            <div class="checkbox">
              <input
                type="checkbox"
                value="watched"
                id="checkboxWatched"
                name="watched"
                checked={selectedOption === "watched"}
                onChange={this.handleOptionChange}
              />
              <label for="checkboxWatched"></label>
            </div>
            <span>Watched</span>

            <div class="checkbox">
              <input
                type="checkbox"
                value="toWatch"
                id="checkboxWatch"
                name="toWatch"
                checked={selectedOption === "toWatch"}
                onChange={this.handleOptionChange}
              />
              <label for="checkboxWatch"></label>
            </div>
            <span>To Watch</span>
          </div>
        ) : (
          <div></div>
        )}

        <div className="watch-list__box">
          {selectedType === "movie" && displayMovies ? (
            displayMovies.map((movie, key) => (
              <WatchListMovie key={key} movie={movie} />
            ))
          ) : selectedType === "tv" && displayShow ? (
            displayShow.map((show, key) => (
              <WatchListTv key={key} show={show} />
            ))
          ) : (
            <div className="watch-list__box-text">
              <span >{`Add ${
                selectedType === "movie" ? "Movies" : "Tv Shows"
              } to your list`}</span>
              <CustomButton onClick={() => history.push(`/discover`)}>
                Discover
              </CustomButton>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(withRouter(WatchListPage));
