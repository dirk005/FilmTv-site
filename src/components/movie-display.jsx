import React from "react";

import CustomButton from "./custom-button";

const MovieDisplay = ({ movieData }) => (
  <div
    className="detailed-display__slide-each"
    style={{
      backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`,
    }}
  >
    <div className="detailed-display__slide-each-overlay"></div>
    <div className="detailed-display__slide_container">
      <div className="detailed-display__slide-box--image">
        <img
          className="detailed-display__slide--image"
          src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
          alt={movieData.title}
        />
      </div>
      <div className="detailed-display__slide--text">
        <div className="detailed-display__slide--text-header">
          <h2>{movieData.title}</h2>
          <span className="detailed-display__slide--text-header__rating">
            {movieData.vote_average}
          </span>
        </div>
        <div className="detailed-display__slide--first">
          <div>
            <span className="detailed-display__slide--first_seperator">
              {" "}
              Release Date :{" "}
            </span>
            <span>{movieData.release_date} </span>
          </div>
          <div>
            <span className="detailed-display__slide--first_seperator">
              {" "}
              Genre :{" "}
            </span>
            {movieData.genres.map((item, key) => (
              <span key={key} className="detailed-display__slide--first_genre">
                {item.name}
              </span>
            ))}
          </div>

          <div>
            <span className="detailed-display__slide--first_seperator">
              {" "}
              Run Time :{" "}
            </span>
            <span>
              {Math.floor(movieData.runtime / 60)}h {movieData.runtime % 60}m
            </span>
          </div>
        </div>

        <div className="detailed-display__slide--description">
          <span className="detailed-display__slide--description_tagline">
            {movieData.tagline}
          </span>
          <span className="detailed-display__slide--description_heading">
            Overview
          </span>
          <span className="detailed-display__slide--description_overview">
            {movieData.overview}
          </span>
        </div>
        <div className='detailed-display__slide--buttons' >
          <CustomButton>Add</CustomButton>
        </div>
      </div>
    </div>
  </div>
);

export default MovieDisplay;
