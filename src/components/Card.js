import React from 'react';
import { withRouter } from 'react-router-dom';

const Card = ({ id, title, poster, rating, history }) => (
  <div className='card'>
    <figure className='card__shape'>
      <img
        className='card__shape--image'
        src={`https://image.tmdb.org/t/p/w500${poster}`}
        alt={title}
      />

      <figcaption className='card__shape--caption'>
        <button
          className='card__shape--caption-button'
          onClick={() => history.push(`/details-page/:${id}`)}
        >
          View
        </button>
      </figcaption>
    </figure>
    <div className='card__rating'>{rating}</div>
  </div>
);

export default withRouter(Card);
