import React, { Component } from "react";

import Loader from "./Loader";

class TvEpisodeDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.seasonId,
      season_number: this.props.season_number,
      episodeData: null,
    };
  }

  componentDidMount() {
    const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;
    const url = `https://api.themoviedb.org/3/tv/${this.state.id}/season/${this.state.season_number}?api_key=${apiKey}&language=en-US`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ ...this.state, episodeData: data });
      })
      .catch((err) => console.log(err.message));
  }

  render() {
    const { episodeData } = this.state;
    console.log(episodeData);
    return (
      <div className="episode_display">
        {episodeData ? (
          episodeData.episodes.map((episode, key) => (
            <div className="episode_display_line" key={key}>
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
                <div class="pretty p-round p-fill p-icon">
                  <input type="checkbox" />
                  <div class="state p-info">
                    <i class="icon mdi mdi-check"></i>
                    <label></label>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
        {}
      </div>
    );
  }
}

export default TvEpisodeDisplay;
