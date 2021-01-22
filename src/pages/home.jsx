import React, { Component } from "react";

import HeaderSlide from "../components/header-slide";
import ScrollContainer from "../container/scroll-container";

class HomePage extends Component {
  render() {
    return (
      <div className="homePage">
        <HeaderSlide />
        <ScrollContainer />
      </div>
    );
  }
}

export default HomePage;
