import React from "react";

import CustomButton from "./custom-button";

const SlideDisplay = ({ film }) => (
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
      <CustomButton type="submit">View</CustomButton>
    </div>
    
  </div>
);

export default SlideDisplay;
