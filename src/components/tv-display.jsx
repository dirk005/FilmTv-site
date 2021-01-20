import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import CustomButton from "./custom-button";
import TvSeasonDisplay from "./tv-season-display";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selector";

class TvDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gotShow: false,
      showId: this.props.movieData.id,
    };
  }

  componentDidMount() {
    if (this.props.currentUser) {
      //get current movie
      fetch(`http://localhost:8080/show/show/${this.state.showId}`, {
        headers: {
          Authorization: `Bearer ${this.props.currentUser.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          return res.gotShow 
            ? this.setState({ gotShow: true })
            : null;
        })
        .catch((err) => console.log(err));
    }
  }

  addShow = () => {
    if (this.props.currentUser) {
      fetch(`http://localhost:8080/show/show`, {
        method: "POST",
        body: JSON.stringify({
          showId: this.props.movieData.id,
        }),
        headers: {
          Authorization: `Bearer ${this.props.currentUser.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((result) => result.json())
        .then((res) => (res.show ? this.setState({ gotShow: true }) : null))
        .catch((err) => console.log(err));
    } else {
      this.props.history.push(`/signin`); // Redirects to sign in page
    }
  };

  //Remove show from user
  removeShow = () => {
    fetch(`http://localhost:8080/show/show/${this.state.showId}`, {
      method: "DELETE",
      body: JSON.stringify({
        showId: this.props.movieData.id,
      }),
      headers: {
        Authorization: `Bearer ${this.props.currentUser.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((res) =>
        this.setState({
          showId: this.props.movieData.id,
          gotShow: false,
        })
      )
      .catch((err) => console.log(err));
  };

  render() {
    const { movieData } = this.props;
    const { gotShow } = this.state;

    return (
      <div>
        <div
          className="detailed-display__slide-each"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`,
          }}
        >
          <div className="detailed-display__slide-each-overlay"></div>
          <div className="detailed-display__slide_container">
            <div className="detailed-display__slide-box--image">
              <img
                className="detailed-display__slide--image"
                src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                alt={movieData.name}
              />
            </div>
            <div className="detailed-display__slide--text">
              <div className="detailed-display__slide--text-header">
                <h2>{movieData.name}</h2>
                <span className="detailed-display__slide--text-header__rating">
                  {movieData.vote_average}
                </span>
              </div>
              <div className="detailed-display__slide--first">
                <div>
                  <span className="detailed-display__slide--first_seperator">
                    {" "}
                    First aired date :{" "}
                  </span>
                  <span>{movieData.first_air_date} </span>
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
                    Seasons :{" "}
                  </span>
                  <span>{movieData.number_of_seasons}</span>
                </div>

                <div>
                  <span className="detailed-display__slide--first_seperator">
                    {" "}
                    Status :{" "}
                  </span>
                  <span>{movieData.status}</span>
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
                {gotShow ? (
                  <div className="detailed-display__slide--buttons-inner">
                    <CustomButton onClick={() => this.removeShow()}>
                      Remove
                    </CustomButton>
                  </div>
                ) : (
                  <CustomButton onClick={() => this.addShow()}>
                    Add
                  </CustomButton>
                )}
              </div>
            </div>
          </div>
        </div>
        <TvSeasonDisplay
          seasons={movieData.seasons}
          id={movieData.id}
          gotShow={gotShow}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(withRouter(TvDisplay));
