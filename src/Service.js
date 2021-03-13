export default class Services {
  baseUrl = 'https://api.themoviedb.org/3';

  apiKey = 'api_key=869cb700bbfae56825fae5c59c77dd18';

  getResourse = async (url, option) => {
    const res = await fetch(url, option);
    if (!res.ok) throw new Error(res.status);
    const body = await res.json();
    return body;
  }
  
  getGenres = () => this.getResourse(`${this.baseUrl}/genre/movie/list?${this.apiKey}`);

  getResourseApi = (data, page) => this.getResourse(`${this.baseUrl}/search/movie?${this.apiKey}&query=${data}&page=${page}`);

  getSessionGuest = () => this.getResourse(`${this.baseUrl}/authentication/guest_session/new?${this.apiKey}`);

  RateMovie(rate, id) {
     return this.getResourse(
      `${this.baseUrl}/movie/${id}/rating?${this.apiKey}&guest_session_id=${localStorage.getItem('guest_session_id')}`,
      {
        method: 'POST',
        body: JSON.stringify({ value: rate }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
  }

  getResourseRated = () => this.getResourse(
      `${this.baseUrl}/guest_session/${localStorage.getItem('guest_session_id')}/rated/movies?${this.apiKey}`
    );
}
