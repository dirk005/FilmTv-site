import React from 'react';
import { withRouter } from 'react-router-dom';

const Card = ({ id, title, poster, rating,type, history }) => (
  <div className='cards'>
    <figure className='cards__shape'>
      <img
        className='cards__shape--image'
        src={`https://image.tmdb.org/t/p/w500${poster}`}
        alt={title}
      />

      <figcaption className='cards__shape--caption'>
        <button
          className='cards__shape--caption-button'
          onClick={() => history.push(`/details-page/${type}/${id}`)}
        >
          View
        </button>
      </figcaption>
    </figure>
    <div className='cards__rating'>{rating}</div>
  </div>
);

export default withRouter(Card);
