import React from "react";
import Card from "./Card";

const CardList = ({ films, type }) => (
  <div className="cardlist">
    {films.length > 1 ? (
      films.map((film, i) => {
        //DISPLAY ALL MOVIES AND SERIES IN FILMS ARRAY
        return (
          <Card
            className="cardlist"
            key={film.id}
            id={film.id}
            title={film.title}
            overview={film.overview}
            poster={film.poster_path}
            release_date={film.release_date}
            rating={film.vote_average}
            type={type}
          />
        );
      })
    ) : (
      <div></div>
    )}
  </div>
);
export default CardList;
