import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selector";

class TvEpisodeLine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showId: this.props.showId,
      episodeId: this.props.episode.id,
      episode: this.props.episode,
      watched: false,
    };
  }

  componentDidMount() {
    if (this.props.currentUser) {
      //get current episode
      fetch(
        `http://localhost:8080/episode/episode/?episodeId=${this.state.episodeId}&showId=${this.state.showId}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.currentUser.token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          return res.watched
            ? this.setState({ watched: true })
            : this.setState({ watched: false });
        })
        .catch((err) => {
          this.setState({
            watched: false,
          });
        });
    }
  }

  addEpisode = () => {
    if (this.props.currentUser) {
      let url = 'https://floating-journey-19460.herokuapp.com/';
      if (process.env.NODE_ENV === 'development'){
        url = 'http://localhost:8080'
    }
      fetch(`${url}/episode/episode`, {
        method: "POST",
        body: JSON.stringify({
          episodeId: this.state.episodeId,
          showId: this.state.showId,
        }),
        headers: {
          Authorization: `Bearer ${this.props.currentUser.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((result) => result.json())
        .then((res) => (res.episode ? this.setState({ watched: true }) : null))
        .catch((err) => console.log(err));
    } else {
      this.props.history.push(`/signin`); // Redirects to sign in page
    }
  };

  //Remove episode from user
  removeEpisode = () => {
    let url = 'https://floating-journey-19460.herokuapp.com/';
      if (process.env.NODE_ENV === 'development'){
        url = 'http://localhost:8080'
    }
    fetch(`${url}/episode/episode`, {
      method: "DELETE",
      body: JSON.stringify({
        showId: this.state.showId,
        episodeId: this.state.episodeId,
      }),
      headers: {
        Authorization: `Bearer ${this.props.currentUser.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((res) => {
        this.setState({
          watched: false,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { episode } = this.props;
    const { watched } = this.state;

    return (
      <div className="episode_display_line">
        <div className="episode_display_line-first">
          <span className="episode_display_line-first__text">
            {episode.episode_number}
          </span>
          <span className="episode_display_line-first__text">
            {episode.name}
          </span>
        </div>

        <div className="episode_display-first">
          <div className="episode_display_line-first">
            <div className="episode_display_line-first__box">
              <span className="episode_display_line-first__text">
                {episode.air_date}
              </span>

              <div>
                <div class="checkbox">
                  <input
                    type="checkbox"
                    checked={watched}
                    id={`checkbox${episode.id}`}
                    onChange={() =>
                      watched ? this.removeEpisode() : this.addEpisode()
                    }
                  />
                  <label for={`checkbox${episode.id}`}></label>
                </div>
              </div>
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
export default connect(mapStateToProps)(withRouter(TvEpisodeLine));
