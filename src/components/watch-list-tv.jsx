import React, { Component } from "react";
import TvDisplay from "./tv-display";
import Loader from "./Loader";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selector";

class WatchListTv extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.show.showId,
      movieData: null,
    };
  }

  componentDidMount() {
    this.handleGetDetails();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.show.showId !== this.props.show.showId) {
      this.handleGetDetails();
    }
  }

  handleGetDetails = () => {
    if (this.props.currentUser) {
      const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;
      const url = `https://api.themoviedb.org/3/tv/${this.props.show.showId}?api_key=${apiKey}&language=en-US`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          this.setState({ movieData: data });
        })
        .catch((err) => console.log(err.message));
    }
  };
  render() {
    const { movieData } = this.state;
    console.log(movieData);
    return (
      <div>{movieData ? <TvDisplay movieData={movieData} displaySeason={false} /> : <Loader />}</div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(WatchListTv);
