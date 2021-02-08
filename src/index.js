import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
import App from './compons/app/app';
import ThemeContext from './context/context'


function Index() {

  const [genres, setGenres] = useState([]);
      
  const getGenres = () => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=869cb700bbfae56825fae5c59c77dd18')
      .then((response) => response.json())
      .then((result) => setGenres(result.genres));
  }

  useEffect(() => {
    getGenres();
  }, [])
  
      return (
        <ThemeContext.Provider value={genres}>
          <App />;
        </ThemeContext.Provider>
      );
    };

render(<Index />, document.getElementById('root'));
