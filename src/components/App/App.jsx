import './App.css';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';

import { CurrentUserContext } from '../../context/CurrentUserContext';

function App() {

  const location = useLocation();

  const navigate = useNavigate();

  const [movieCards, setMovieCards] = useState([]);
  const [savedMovieCards, setSavedMovieCards] = useState([]);
  const [searchMovieCards, setSearchMovieCards] = useState([]); // для найденных по запросу фильмов

  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });

  const [loggedIn, setLoggedIn] = useState(false);

  const [currentInputQuery, setCurrentInputQuery] = useState('');

  const [isShortFilm, setIsShortFilm] = useState(localStorage.getItem('shortFilmStatus') || false);

  function handleCheckToken() {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.checkToken(token)
        .then((data) => {
          setLoggedIn(true);
          navigate(location.pathname); //чтоб оставаться при обновлении страницы на том же месте где и были
          setCurrentUser(data);
          getUserMovies();
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }

  function handleUpdateUser(inputData) {
    mainApi.editUser(inputData)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function onSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('inputSearch');
    localStorage.removeItem('findedMovies');
    setSavedMovieCards([]);
    setSearchMovieCards([])
    setMovieCards([])
    setCurrentInputQuery([])
    setLoggedIn((''));
  }

  function handleRegistration(inputData) {
    mainApi.register(inputData)
      .then((data) => {
        navigate('/signin');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAuthorization(inputData) {
    mainApi.login(inputData)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // поиск фильмов по инпуту
  function handleSearchMovie(inputSearch) {

    localStorage.setItem('inputSearch', inputSearch); // сохраняем текущий запрос в локальное хранилище
    localStorage.setItem('shortFilmStatus', isShortFilm) // сохраняем текущее состояние чекбокса в лок хран
    if (movieCards.length === 0) {  // если нет загруженных фильмов
      moviesApi.getMovies()
        .then((data) => {

          const resultSearchMovie = [];  //сюда будем добавлять результат поиска
          data.forEach((movie) => {
            if (movie.nameRU.toLowerCase().includes(inputSearch.toLowerCase())) { //убрать чувствительность к регистру
              if (isShortFilm) {
                movie.duration <= 40 && resultSearchMovie.push(movie);
              } else {
                resultSearchMovie.push(movie);
              }
            }
          })

          localStorage.setItem('findedMovies', JSON.stringify(resultSearchMovie));
          setSearchMovieCards(JSON.parse(localStorage.getItem('findedMovies')))
          setMovieCards(data); // чтобы в след раз поиск проводить без запроса к api
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });

      //  в случае если фильмы загружены в movieCards
    } else {
      const resultSearchMovie = [];
      movieCards.forEach((movie) => {
        if (movie.nameRU.toLowerCase().includes(inputSearch.toLowerCase())) { //убрать чувствительность к регистру
          if (isShortFilm) {
            movie.duration <= 40 && resultSearchMovie.push(movie);
          } else {
            resultSearchMovie.push(movie);
          }
        }
      })

      localStorage.setItem('findedMovies', JSON.stringify(resultSearchMovie));
      setSearchMovieCards(JSON.parse(localStorage.getItem('findedMovies')))
    }
  }

  // поиск  по инпуту среди сохраненных фильмов
  function handleSearchSaveMovie(inputSearch) {
    const resultSearchSavedMovie = [];
    JSON.parse(localStorage.getItem('savedMovieCards')).forEach((movie) => {
      if (movie.nameRU.toLowerCase().includes(inputSearch.toLowerCase())) {
        resultSearchSavedMovie.push(movie);
      }
    })
    setSavedMovieCards(resultSearchSavedMovie)
  }

  function handleShortFilm() {
    setIsShortFilm(!isShortFilm)
  }

  // запрос сохраненных пользователем фильмов
  function getUserMovies() {
    mainApi
      .getUserMovies()
      .then((savedMovies) => {
        setSavedMovieCards(savedMovies);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function saveMovieCardsActive(movieCard) {
    // function sayTrue() {
    return savedMovieCards.some(
      (c) => c.nameRU === movieCard.nameRU
    );
    // }
    // console.log(sayTrue());
  }

  function saveMovieCard(movie) {
    mainApi
      .addNewUserMovie(movie)
      .then((newMovie) => {
        setSavedMovieCards([...savedMovieCards, newMovie]);
        const saveMoviesLocalStorage = [...savedMovieCards, newMovie];
        localStorage.setItem('savedMovieCards', JSON.stringify(saveMoviesLocalStorage))
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteMovieCard(movie) {
    const movieForDelete = savedMovieCards.find((c) => c.movieId === movie.id || movie.movieId);

    mainApi
      .deleteUserMovie(movieForDelete._id)
      .then(() => {
        setSavedMovieCards((state) => state.filter((c) => c._id !== movieForDelete._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }



  useEffect(() => {
    if (loggedIn) {
      mainApi.getUser()
        .then((data) => {
          setCurrentUser(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }, [])

  useEffect(() => {
    handleCheckToken();
  }, [loggedIn])

  useEffect(() => {

    if (localStorage.getItem('inputSearch')) {
      setCurrentInputQuery(localStorage.getItem('inputSearch'));
    }

    if (localStorage.getItem('findedMovies')) {
      setSearchMovieCards(JSON.parse(localStorage.getItem('findedMovies')));
    }

  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />

          <Routes>
            <Route path='/' element={<Main />} />

            <Route path='/movies' element={<Movies
              movieCards={searchMovieCards}
              saveActive={saveMovieCardsActive}
              onMovieCardLike={saveMovieCard}
              onMovieCardLikeOff={deleteMovieCard}
              onSearchMovie={handleSearchMovie}
              currentInputQuery={currentInputQuery}
              handleShortFilm={handleShortFilm}
              isShortFilm={isShortFilm}

            />} />

            <Route path='/saved-movies' element={<SavedMovies
              movieCards={savedMovieCards}
              onMovieCardLikeOff={deleteMovieCard}
              onSearchMovie={handleSearchSaveMovie}
            />} />
            <Route path='/profile' element={<Profile
              onUpdateUser={handleUpdateUser}
              onSignOut={onSignOut} />} />
            <Route path='/signup' element={<Register onRegistration={handleRegistration} />} />
            <Route path='/signin' element={<Login onAuthorization={handleAuthorization} />} />
            <Route path='/*' element={<PageNotFound />} />
          </Routes>

          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;