export default class Services {

  baseUrl = 'https://api.themoviedb.org/3';

  apiKey = 'api_key=869cb700bbfae56825fae5c59c77dd18';

  getResourse = async (url, option) => {
    const res = await fetch(`${this.baseUrl}${url}`, option);
    if (!res.ok) throw new Error(res.status); 
    const body = await res.json();
    return body;
  }
  
  getGenres = () => this.getResourse(`/genre/movie/list?${this.apiKey}`);

  getResourseApi = (data, page) => this.getResourse(`/search/movie?${this.apiKey}&query=${data}&page=${page}`);

  getSessionGuest = () => this.getResourse(`/authentication/guest_session/new?${this.apiKey}`);

  RateMovie = (rate, id) => this.getResourse(
      `/movie/${id}/rating?${this.apiKey}&guest_session_id=${localStorage.getItem('guest_session_id')}`,
      {
        method: 'POST',
        body: JSON.stringify({ value: rate }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
  
  getResourseRated = () => this.getResourse(
      `/guest_session/${localStorage.getItem('guest_session_id')}/rated/movies?${this.apiKey}`
    );
}
