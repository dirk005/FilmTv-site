import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import CustomButton from "./custom-button";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selector";

class MovieDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      watched: false,      
      gotMovie: false,
    };
  }

  componentDidMount() {
    this.handleGetDetails();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.movieData.id !== this.props.movieData.id) {      
      this.handleGetDetails();
    }
  }

  handleGetDetails = () => {
    if (this.props.currentUser) {
      //get current movie
      fetch(`http://localhost:8080/movie/movie/${this.props.movieData.id}`, {
        headers: {
          Authorization: `Bearer ${this.props.currentUser.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          return res.gotMovie
            ? this.setState({ watched: res.watched, gotMovie: true })
            : null;
        })
        .catch((err) => console.log(err));
    }
  };

  addMovie = () => {
    if (this.props.currentUser) {
      fetch(`http://localhost:8080/movie/movies`, {
        method: "POST",
        body: JSON.stringify({
          movieId: this.props.movieData.id,
        }),
        headers: {
          Authorization: `Bearer ${this.props.currentUser.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((result) => result.json())
        .then((res) => (res.movie ? this.setState({ gotMovie: true }) : null))
        .catch((err) => console.log(err));
    } else {
      this.props.history.push(`/signin`); // redirects to sign in page
    }
  };

  //Update movie watched status
  updateMovie = () => {
    fetch(`http://localhost:8080/movie/movie/${this.props.movieData.id}`, {
      method: "PUT",
      body: JSON.stringify({
        movieId: this.props.movieData.id,
      }),
      headers: {
        Authorization: `Bearer ${this.props.currentUser.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((res) => this.setState({ watched: res.watched }))
      .catch((err) => console.log(err));
  };

  //Remove movie from user
  removeMovie = () => {
    fetch(`http://localhost:8080/movie/movie/${this.props.movieData.id}`, {
      method: "DELETE",
      body: JSON.stringify({
        movieId: this.props.movieData.id,
      }),
      headers: {
        Authorization: `Bearer ${this.props.currentUser.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((res) =>
        this.setState({
          watched: false,
          movieId: this.props.movieData.id,
          gotMovie: false,
        })
      )
      .catch((err) => console.log(err));
  };

  render() {
    //Get details fom state and props
    const { movieData } = this.props;
    const { gotMovie, watched } = this.state;

    return (
      <div
        className="detailed-display__slide-each"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`,
        }}
      >
        <div className="detailed-display__slide_container">
          <div className="detailed-display__slide-box--image">
            <img
              className="detailed-display__slide--image"
              src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
              alt={movieData.title}
            />
          </div>
          <div className="detailed-display__slide--text">
            <div className="detailed-display__slide--text-header">
              <h2>{movieData.title}</h2>
              <span className="detailed-display__slide--text-header__rating">
                {movieData.vote_average}
              </span>
            </div>
            <div className="detailed-display__slide--first">
              <div>
                <span className="detailed-display__slide--first_seperator">
                  {" "}
                  Release Date :{" "}
                </span>
                <span>{movieData.release_date} </span>
              </div>
              <div>
                <span className="detailed-display__slide--first_seperator">
                  {" "}
                  Genre :{" "}
                </span>
                {movieData.genres.map((item, key) => (
                  <span
                    key={key}
                    className="detailed-display__slide--first_genre"
                  >
                    {item.name}
                  </span>
                ))}
              </div>

              <div>
                <span className="detailed-display__slide--first_seperator">
                  {" "}
                  Run Time :{" "}
                </span>
                <span>
                  {Math.floor(movieData.runtime / 60)}h {movieData.runtime % 60}
                  m
                </span>
              </div>
            </div>

            <div className="detailed-display__slide--description">
              <span className="detailed-display__slide--description_tagline">
                {movieData.tagline}
              </span>
              <span className="detailed-display__slide--description_heading">
                Overview
              </span>
              <span className="detailed-display__slide--description_overview">
                {movieData.overview}
              </span>
            </div>
            <div className="detailed-display__slide--buttons">
              {gotMovie ? (
                <div className="detailed-display__slide--buttons-inner">
                  <CustomButton onClick={() => this.removeMovie()}>
                    Remove
                  </CustomButton>
                  <div className="detailed-display__slide--buttons-inner">
                    <span>Watched : </span>
                    <div className="pretty p-round p-fill p-icon detailed-display__slide--buttons-inner_check">
                      <input
                        type="checkbox"
                        checked={watched}
                        onChange={() => this.updateMovie()}
                      />
                      <div className="state p-info">
                        <i className="icon mdi mdi-check"></i>
                        <label></label>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <CustomButton onClick={() => this.addMovie()}>Add</CustomButton>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(withRouter(MovieDisplay));
