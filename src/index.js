import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import App from './compons/app/app';
import GenresContext from './context/context';
import './index.css';
import Service from './Service';

function Index() {

  const apiService = new Service;
  const [genres, setGenres] = useState([]);


  useEffect(() => {
    apiService.getGenres().then((result) => setGenres(result.genres));
  }, []);

  return (
    <GenresContext.Provider value={genres}>
      <App />;
    </GenresContext.Provider>
  );
}

render(<Index />, document.getElementById('root'));
