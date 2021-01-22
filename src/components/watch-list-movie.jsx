import React, { Component } from "react";
import MovieDisplay from "./movie-display";
import Loader from "./Loader";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selector";

class WatchListMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.movie.movieId,
      movieData: null,
     
    };
  }

  componentDidMount() {
    this.handleGetDetails();
  }

  componentDidUpdate(prevProps, prevState) {
    
    if (prevProps.movie.movieId!== this.props.movie.movieId) {
      // this.setState({ id: this.props.movie.movieId});
      this.handleGetDetails();
    }
  }


  handleGetDetails = () => {
    if (this.props.currentUser) {
      const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/${this.props.movie.movieId}?api_key=${apiKey}&language=en-US`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          this.setState({  movieData: data });
        })
        .catch((err) => console.log(err.message));
    }
  }
  render() {
    const { movieData } = this.state;
    console.log(movieData)
    return (
      <div>
        {movieData ? <MovieDisplay movieData={movieData} /> : <Loader />}
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(WatchListMovie);
