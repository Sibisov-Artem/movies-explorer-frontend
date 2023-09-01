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

import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';

import { CurrentUserContext } from '../../context/CurrentUserContext';

function App() {

  const location = useLocation();

  const navigate = useNavigate();

  const [movieCards, setMovieCards] = useState([]); // первая загрузка с moviesApi
  const [savedMovieCards, setSavedMovieCards] = useState([]); //сохраненные пользователем
  const [searchMovieCards, setSearchMovieCards] = useState([]); // для найденных по запросу фильмов для роута movies

  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });

  const [loggedIn, setLoggedIn] = useState(false);

  const [currentInputQuery, setCurrentInputQuery] = useState('');
  const [currentInputQuerySaveMovie, setCurrentInputQuerySaveMovie] = useState('');

  const [isShortFilm, setIsShortFilm] = useState(JSON.parse(localStorage.getItem('shortFilmStatus')) || false);
  const [isShortFilmSaveMovie, setIsShortFilmSaveMovie] = useState(JSON.parse(localStorage.getItem('shortFilmStatusSaveMovie')) || false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSavedMovie, setIsLoadingSavedMovie] = useState(false);

  function handleCheckToken() {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.checkToken(token)
        .then((data) => {
          setLoggedIn(true);
          navigate(location.pathname); //чтоб оставаться при обновлении страницы на том же месте где и были
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }

  //==========================================================
  //==============================================================
  function handleRegistration(inputData) {
    mainApi.register(inputData)
      .then(() => {
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
    localStorage.removeItem('inputSearchSaveMovie');

    localStorage.removeItem('shortFilmStatus');
    localStorage.removeItem('shortFilmStatusSaveMovie');

    localStorage.removeItem('findedMovies');
    localStorage.removeItem('findedSaveMovies');
    localStorage.removeItem('savedMovieCards');

    setSavedMovieCards([]);
    setSearchMovieCards([])
    setMovieCards([])

    setCurrentInputQuery([])
    setCurrentInputQuerySaveMovie([])

    setLoggedIn((''));
  }

  //==========================================================
  //=========================================================

  // поиск фильмов по инпуту
  function handleSearchMovie(inputSearch) {

    localStorage.setItem('inputSearch', inputSearch); // сохраняем текущий запрос в локальное хранилище
    localStorage.setItem('shortFilmStatus', isShortFilm) // сохраняем текущее состояние чекбокса в лок хран
    if (movieCards.length === 0) {  // если нет загруженных фильмов

      setIsLoading(true);
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
        })
        .finally(() => {
          setIsLoading(false);
        })

      //  в случае если фильмы загружены в movieCards
    } else {
      setIsLoading(true);
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
      setSearchMovieCards(JSON.parse(localStorage.getItem('findedMovies')));
      setIsLoading(false);
    }
  }

  // поиск  по инпуту среди сохраненных фильмов
  function handleSearchSaveMovie(inputSearch) {

    // тут надо написать условие, что если  есть сохраненные карточки то производим поиск
    if (localStorage.getItem('savedMovieCards')) {

      setIsLoadingSavedMovie(true);
      localStorage.setItem('inputSearchSaveMovie', inputSearch); // сохраняем текущий запрос в локальное хранилище
      localStorage.setItem('shortFilmStatusSaveMovie', isShortFilmSaveMovie) // сохраняем текущее состояние чекбокса в лок хран
      const resultSearchSavedMovie = [];
      JSON.parse(localStorage.getItem('savedMovieCards')).forEach((movie) => { //среди сохраненных пользовательских ищем по инпут запросу
        if (movie.nameRU.toLowerCase().includes(inputSearch.toLowerCase())) {
          if (isShortFilmSaveMovie) {
            movie.duration <= 40 && resultSearchSavedMovie.push(movie);
          } else {
            resultSearchSavedMovie.push(movie);
          }
        }
      })
      localStorage.setItem('findedSaveMovies', JSON.stringify(resultSearchSavedMovie));
      setSavedMovieCards(JSON.parse(localStorage.getItem('findedSaveMovies')));
      setIsLoadingSavedMovie(false);
    }
  }

  function handleShortFilm() {
    setIsShortFilm(!isShortFilm)
  }

  function handleShortSaveFilm() {
    setIsShortFilmSaveMovie(!isShortFilmSaveMovie)
  }

  // запрос сохраненных пользователем фильмов
  function getUserMovies() {
    setIsLoadingSavedMovie(true);
    mainApi
      .getUserMovies()
      .then((savedMovies) => {
        setSavedMovieCards(savedMovies);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setIsLoadingSavedMovie(false);
      })
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


  //========================================================================
  //========================================================================
  //========================================================================
  //========================================================================
  //========================================================================
  //========================================================================


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
    getUserMovies();
  }, [])

  useEffect(() => {
    handleCheckToken();
  }, [loggedIn])



  useEffect(() => {
    // для сохранения при обновлении страницы поискового запроса на роуте movies
    if (localStorage.getItem('inputSearch')) {
      setCurrentInputQuery(localStorage.getItem('inputSearch'));
    }
    // для сохранения при обновлении страницы поискового запроса на роуте save-movies
    if (localStorage.getItem('inputSearchSaveMovie')) {
      setCurrentInputQuerySaveMovie(localStorage.getItem('inputSearchSaveMovie'));
    }
    // для сохранения при обновлении страницы найденных по запросу фильмов на роуте movies
    if (localStorage.getItem('findedMovies')) {
      setSearchMovieCards(JSON.parse(localStorage.getItem('findedMovies'))); //найденные по поиску для роута movies
    }
    // для сохранения при обновлении страницы найденных по запросу фильмов на роуте save-movies
    const findedSaveMoviesForDisplay = JSON.parse(localStorage.getItem('findedSaveMovies'));
    if (findedSaveMoviesForDisplay) {
      setSavedMovieCards(findedSaveMoviesForDisplay)
    }
  }, [loggedIn]);


  //========================================================================
  //========================================================================
  //========================================================================
  //========================================================================
  //========================================================================
  //========================================================================

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />

          <Routes>
            <Route path='/' element={<Main />} />

            <Route path='/movies' element={<ProtectedRouteElement
              element={Movies}
              loggedIn={loggedIn}
              movieCards={searchMovieCards}
              saveActive={saveMovieCardsActive}
              onMovieCardLike={saveMovieCard}
              onMovieCardLikeOff={deleteMovieCard}
              onSearchMovie={handleSearchMovie}
              currentInputQuery={currentInputQuery}
              handleShortFilm={handleShortFilm}
              isShortFilm={isShortFilm}
              isLoading={isLoading}

            />} />

            <Route path='/saved-movies' element={<ProtectedRouteElement
              element={SavedMovies}
              loggedIn={loggedIn}
              movieCards={savedMovieCards}
              onMovieCardLikeOff={deleteMovieCard}
              onSearchMovie={handleSearchSaveMovie}
              currentInputQuery={currentInputQuerySaveMovie}
              handleShortFilm={handleShortSaveFilm}
              isShortFilm={isShortFilmSaveMovie}
              isLoading={isLoadingSavedMovie}
            />} />
            <Route path='/profile' element={<ProtectedRouteElement
              element={Profile}
              loggedIn={loggedIn}
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