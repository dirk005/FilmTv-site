import React, { Component } from "react";

import Loader from "./Loader";
import TvEpisodeLine from "./tv-episode-line";

class TvEpisodeDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.seasonId,
      season_number: this.props.season_number,
      episodeData: null,
      gotShow: this.props.gotShow,
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
    

    return (
      <div className="episode_display">
        {episodeData ? (
          episodeData.episodes.map((episode, key) => (
            <TvEpisodeLine key={key} episode={episode}  showId={this.props.showId}/>
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
