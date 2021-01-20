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
        `http://localhost:8080/episode/episode/${this.state.episodeId}/${this.state.showId}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.currentUser.token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {         
          return res.watched ? this.setState({ watched: true }) : null;
        })
        .catch((err) => console.log(err));
    }
  }

  addEpisode = () => {
    if (this.props.currentUser) {
      fetch(`http://localhost:8080/episode/episode`, {
        method: "POST",
        body: JSON.stringify({
          episodeId: this.props.episode.id,
          showId: this.props.showId,
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

  //Remove show from user
  removeEpisode = () => {
    fetch(`http://localhost:8080/episode/episode`, {
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
      .then((res) =>
        this.setState({
          watched: false,
        })
      )
      .catch((err) => console.log(err));
  };

  render() {
    const { gotShow, episode } = this.props;
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
          <span className="episode_display_line-first__text">
            {episode.air_date}
          </span>
          {gotShow ? (
            <div className="pretty p-round p-fill p-icon">
              <input
                type="checkbox"
                checked={watched}
                onChange={() =>
                  watched ? this.removeEpisode() : this.addEpisode()
                }
              />
              <div className="state p-info">
                <i className="icon mdi mdi-check"></i>
                <label></label>
              </div>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(withRouter(TvEpisodeLine));
