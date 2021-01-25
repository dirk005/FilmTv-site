import React, { Component } from "react";
import Loader from "./Loader";
import MovieDisplay from "./movie-display";
import TvDisplay from "./tv-display";

class DisplayDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.match.params.type,
      id: this.props.match.params.mdbId,
    };
  }
  componentDidMount() {
    const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;
    const url = `https://api.themoviedb.org/3/${this.state.type}/${this.state.id}?api_key=${apiKey}&language=en-US`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ ...this.state, movieData: data });
      })
      .catch((err) => console.log(err.message));
  }
  render() {
    console.log(this.state);
    const { type, movieData } = this.state;

    return (
      <div>
        {movieData ? (
          <div className='detailed-display'>
            {type === "movie" ? (
              <MovieDisplay movieData={movieData} />
            ) : (
              <TvDisplay movieData={movieData} displaySeason={true}/>
            )}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default DisplayDetails;
