// API URL
const MAIN_API_URL = 'http://localhost:3000';
// const MAIN_API_URL = 'https://api.a-sibisov.nomoreparties.co';
const API_MOVIES = 'https://api.nomoreparties.co';
const API_GET_MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';

// длительность короткометражек, количество фильмов, отображаемое при поиске
// или добавляемое при нажатии кнопки "Еще" на разных размерах экрана и точки перестроения экрана нужно вынести в константы
const SHORT_MOVIE_DURATION = 40;

const QUANTITY_MOVIE_FOR_BIG_SIZE_WINDOW = 12;
const QUANTITY_MOVIE_FOR_MEDIUM_SIZE_WINDOW = 8;
const QUANTITY_MOVIE_FOR_SMALL_SIZE_WINDOW = 5;

const LOAD_MORE_MOVIE_FOR_BIG_SIZE_WINDOW = 3;
const LOAD_MORE_MOVIE_FOR_MEDIUM_SIZE_WINDOW = 2;
const LOAD_MORE_MOVIE_FOR_SMALL_SIZE_WINDOW = 2;

const SIZE_WINDOW = {
  big: 1280,
  small: 600,
}



export {
  MAIN_API_URL,
  API_MOVIES,
  API_GET_MOVIES_URL,
  SHORT_MOVIE_DURATION,
  QUANTITY_MOVIE_FOR_BIG_SIZE_WINDOW,
  QUANTITY_MOVIE_FOR_MEDIUM_SIZE_WINDOW,
  QUANTITY_MOVIE_FOR_SMALL_SIZE_WINDOW,
  LOAD_MORE_MOVIE_FOR_BIG_SIZE_WINDOW,
  LOAD_MORE_MOVIE_FOR_MEDIUM_SIZE_WINDOW,
  LOAD_MORE_MOVIE_FOR_SMALL_SIZE_WINDOW,
  SIZE_WINDOW,
};