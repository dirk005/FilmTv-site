import React from "react";
import { withRouter } from "react-router-dom";

import CustomButton from "./custom-button";

const SlideDisplay = ({ film, type, history }) => (
  <div
    className="header__slide-each "
    style={{
      backgroundImage: `url(https://image.tmdb.org/t/p/original${film.backdrop_path})`,
    }}
  >
    <div className="header__slide--heading">
      {film.hasOwnProperty("title") ? (
        <span className="header__slide--heading-span">{film.title}</span>
      ) : (
        <span className="header__slide--heading-span">{film.name}</span>
      )}
      <p className="header__slide--overview">{film.overview}</p>
      <CustomButton
        onClick={() => history.push(`/details-page/${type}/${film.id}`)}
      >
        View
      </CustomButton>
    </div>
  </div>
);

export default withRouter(SlideDisplay);
