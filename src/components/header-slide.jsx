import React from 'react';
import { Slide } from 'react-slideshow-image';

import SlideDisplay from './slide-display';

//Import Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectTopMovies } from '../redux/moviedb/moviedb.selector';

import 'react-slideshow-image/dist/styles.css'; // needs to be imported for slideshow to work

//Set prperties for Slideshow
const properties = {
  duration: 5500,
  transitionDuration: 1500,
  infinite: true,
  indicators: true,
  arrows: false,
};

const HeaderSlide = ({ topMovies }) => (
  <header className='header'>
    <Slide className='header__slide ' {...properties}>
      {topMovies
        .filter((film, key) => key <= 6)
        .map((data, key) => (
          <SlideDisplay key={key} film={data} type={topMovies.type} />
        ))}
    </Slide>
  </header>
);

const mapStateToProps = createStructuredSelector({
  topMovies: selectTopMovies,
});
export default connect(mapStateToProps)(HeaderSlide);
