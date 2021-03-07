import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import App from './compons/app/app';
import GenresContext from './context/context';
import './index.css';
import Service from './Service';

function Index() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    Service.getGenres(setGenres);
  }, []);

  return (
    <GenresContext.Provider value={genres}>
      <App />;
    </GenresContext.Provider>
  );
}

render(<Index />, document.getElementById('root'));
