import React from 'react';

import Scroll from '../components/scroll';

const ScrollContainer = () => {
  const displayFilms = [
    {
      page: 'popularMovies',
      heading: 'Popular Movies',
    },
    {
      page: 'upcomingMovies',
      heading: 'Upcoming Movies',
    },
    {
      page: 'nowPlayingMovies',
      heading: 'Now Playing Movies',
    },
    {
      page: 'popularTv',
      heading: 'Popular TV Shows',
    },
    {
      page: 'topRatedTv',
      heading: 'Top Rated TV Shows',
    },
  ];

  return (
    <div>
      {
        //Display all pages(Movies and series) form props
        displayFilms.map((page, i) => (
          <Scroll
            className='scroll'
            key={i}
            header={page.heading}
            films={page.page}
          />
        ))
      }
    </div>
  );
};

export default ScrollContainer;
