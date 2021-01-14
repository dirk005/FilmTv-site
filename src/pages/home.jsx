import React, { Component } from "react";

import HeaderSlide from '../components/header-slide';

import { connect } from "react-redux";
import { getTopMovieStartAsync } from "../redux/moviedb/moviedb.actoins";


class HomePage extends Component {
   
    componentDidMount(){
        this.props.getTopMovieStartAsync();
    }
  render() {
    return (
      <div className="homePage">
      
        <HeaderSlide/>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
    getTopMovieStartAsync: () => dispatch(getTopMovieStartAsync()),
});

export default connect(null, mapDispatchToProps)(HomePage);
