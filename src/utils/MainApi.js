class MainApi {
  constructor(options) {
    this.url = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  _giveHeaders() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU2NDQzOGRhNDJjMGQ2MmM1MTI0OTQiLCJpYXQiOjE2OTI4MTIzNTIsImV4cCI6MTY5MzQxNzE1Mn0.1fqhN5ppzwHNIKir5qdmu3ckXyp7RZPog6IIZAsNwp4'
    //localStorage.getItem('token');
    const newHeaderObj = {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return newHeaderObj;
  }

  //============== AUTH =========================

  // ----РЕГИСТРАЦИЯ-----------
  register(inputData) {
    return this._request(`${this.url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: inputData.name,
        email: inputData.email,
        password: inputData.password
      }),
    })
  };

  // ----ЛОГИН-----------
  login(inputData) {
    return this._request(`${this.url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: inputData.email,
        password: inputData.password
      }),
    })
  };

  // ------ПРоверка токена-----------
  checkToken(token) {
    return this._request(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
  };
  // ========================================================


  // метод получения информации о пользователе с сервера
  getUser() {
    return this._request(`${this.url}/users/me`, {
      headers: { ...this._giveHeaders() },
    })
  }

  // редактирование пользователя
  editUser(inputData) {
    return this._request(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: { ...this._giveHeaders() },
      body: JSON.stringify({
        name: inputData.name,
        email: inputData.email
      })
    })
  }

  // запрос сохраненных фильмов
  getUserMovies() {
    return this._request(`${this.url}/movies`, {
      headers: { ...this._giveHeaders() },
    })
  }

  // сохраняем фильм (лайкуем)
  addNewUserMovie(movie) {
    return this._request(`${this.url}/movies`, {
      method: 'POST',
      headers: { ...this._giveHeaders() },
      body: JSON.stringify({

        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: movie.thumbnail,
        movieId: movie.movieId,
      })
    })
  }

  //удаление (/дизлайк) фильма из сохраненных пользователем
  deleteUserMovie(movieId) {
    return this._request(`${this.url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: { ...this._giveHeaders() },
    })
  }
}

export const mainApi = new MainApi({
  baseUrl: 'http://localhost:3000',
});