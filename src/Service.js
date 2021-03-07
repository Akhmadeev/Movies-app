class Services {
  getGenres = (getItem) => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=869cb700bbfae56825fae5c59c77dd18')
      .then((response) => response.json())
      .then((result) => getItem(result.genres));
  };

  getResourse = (getCardds, loading, err, data, page) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=869cb700bbfae56825fae5c59c77dd18&query=${data}&page=${page}`
    )
      .then((res) => res.json())
      .then((body) => {
        getCardds(body.results);
        loading(false);
      })
      .catch(err);
  };

  getSessionGuest = () => {
    fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=869cb700bbfae56825fae5c59c77dd18`)
      .then((body) => body.json())
      .then((result) => localStorage.setItem('guest_session_id', result.guest_session_id));
  };

  RateMovie = (rate, id) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=869cb700bbfae56825fae5c59c77dd18&guest_session_id=${localStorage.getItem(
        'guest_session_id'
      )}`,
      {
        method: 'POST',
        body: JSON.stringify({ value: rate }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    ).then((response) => response.json());
  };

  getResourseRated = (cards, loading, error) => {
    fetch(
      `https://api.themoviedb.org/3/guest_session/${localStorage.getItem(
        'guest_session_id'
      )}/rated/movies?api_key=869cb700bbfae56825fae5c59c77dd18`
    )
      .then((res) => res.json())
      .then((body) => {
        cards(body.results);
        loading(false);
      })
      .catch(error);
  };
}
export default new Services();
