import React, { Component } from "react";

import { connect } from "react-redux";
import { getTopMovieStartAsync } from "../redux/moviedb/moviedb.actoins";

class HomePage extends Component {
   
    componentDidMount(){
        this.props.getTopMovieStartAsync();
    }
  render() {
    return (
      <div className="homePage">
        <div className="header">
          <h1>Home Page</h1>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
    getTopMovieStartAsync: () => dispatch(getTopMovieStartAsync()),
});

export default connect(null, mapDispatchToProps)(HomePage);
