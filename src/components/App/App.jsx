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

  const [movieCards, setMovieCards] = useState((JSON.parse(localStorage.getItem('movieCards'))) || []); // первая загрузка с moviesApi
  const [savedMovieCards, setSavedMovieCards] = useState([]); //сохраненные пользователем
  const [searchMovieCards, setSearchMovieCards] = useState([]); // для найденных по запросу фильмов для роута movies

  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });

  const [loggedIn, setLoggedIn] = useState(false);

  const [currentInputQuery, setCurrentInputQuery] = useState('');
  const [currentInputQuerySaveMovie, setCurrentInputQuerySaveMovie] = useState('');

  const [isShortFilm, setIsShortFilm] = useState(false);
  const [isShortFilmSaveMovie, setIsShortFilmSaveMovie] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSavedMovie, setIsLoadingSavedMovie] = useState(false);

  const [movieNotFound, setMovieNotFound] = useState('');
  const [saveMovieNotFound, setSaveMovieNotFound] = useState('');

  const [errorMessageRegister, setErrorMessageRegister] = useState('');
  const [errorMessageLogin, setErrorMessageLogin] = useState('');
  const [errorMessageProfile, setErrorMessageProfile] = useState('');
  const [successMessageProfile, setSuccessMessageProfile] = useState('');

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
        handleAuthorization(inputData)
      })
      .catch((err) => {
        console.log(err);
        if (err === 'Что-то пошло не так: 409') {
          setErrorMessageRegister('Пользователь с таким email уже существует.')
        } else if (err === 'Что-то пошло не так: 400') {
          setErrorMessageRegister('При регистрации пользователя произошла ошибка.');
        };
        setTimeout(setErrorMessageRegister, 4000);
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
        if (err === 'Что-то пошло не так: 401') {
          setErrorMessageLogin('Вы ввели неправильный логин или пароль.');
        } else if (err === 'Что-то пошло не так: 400') {
          setErrorMessageLogin('При авторизации произошла ошибка. Некорректен email.');
        }
        setTimeout(setErrorMessageLogin, 4000);
      }
      );
  }

  function handleUpdateUser(inputData) {
    mainApi.editUser(inputData)
      .then((data) => {
        setCurrentUser(data);
        setSuccessMessageProfile('Информация обновлена!');
        setTimeout(setSuccessMessageProfile, 4000)
      })
      .catch((err) => {
        if (err === 'Что-то пошло не так: 500') {
          setErrorMessageProfile('Пользователь с таким email уже существует.');
        } else if (err === 'Что-то пошло не так: 400') {
          setErrorMessageProfile("При обновлении произошла ошибка");
        }
        setTimeout(setErrorMessageProfile, 4000);
        console.log(err);
      })
  }

  function onSignOut() {

    localStorage.clear();

    setCurrentUser({ name: '', email: '' });

    setSavedMovieCards([]);
    setSearchMovieCards([]);
    setMovieCards([]);

    setCurrentInputQuery([]);
    setCurrentInputQuerySaveMovie([]);

    setIsShortFilm(false);
    setIsShortFilmSaveMovie(false);

    setMovieNotFound('');
    setSaveMovieNotFound('');

    setLoggedIn(false);
  }

  //==========================================================
  //=========================================================

  // поиск фильмов по инпуту
  function handleSearchMovie(inputSearch) {

    localStorage.setItem('inputSearch', inputSearch); // сохраняем текущий запрос в локальное хранилище
    if (movieCards.length === 0) {  // если нет загруженных фильмов

      setIsLoading(true);
      moviesApi.getMovies()
        .then((data) => {
          const resultSearchMovie = [];  //сюда будем добавлять результат поиска
          const resultSearchByInputForCheckbox = [];  //сюда будем добавлять результат поиска по инпуту и направим для работы с переключением чекбокса
          data.forEach((movie) => {

            if (movie.nameRU.toLowerCase().includes(inputSearch.toLowerCase()) || movie.nameEN.toLowerCase().includes(inputSearch.toLowerCase())) { //убрать чувствительность к регистру
              resultSearchByInputForCheckbox.push(movie);
              localStorage.setItem('resultSearchByInputForCheckbox', JSON.stringify(resultSearchByInputForCheckbox));

              if (isShortFilm) {
                movie.duration <= 40 && resultSearchMovie.push(movie);
              } else {
                resultSearchMovie.push(movie);
              }
            }
          })

          localStorage.setItem('findedMovies', JSON.stringify(resultSearchMovie));
          setSearchMovieCards(JSON.parse(localStorage.getItem('findedMovies')));

          localStorage.setItem('movieCards', JSON.stringify(data));
          setMovieCards(JSON.parse(localStorage.getItem('movieCards'))); // чтобы в след раз поиск проводить без запроса к api
          if (resultSearchMovie.length === 0) {
            setMovieNotFound('Ничего не найдено')

          } else {
            setMovieNotFound('')
          }
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
          setMovieNotFound('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
        })
        .finally(() => {
          setIsLoading(false);
        })
      ///////////////////////////////////////////////////////////////////////////////////////////////
      // продолжение функции// часть вторая
      ///////////////////////////////////////////////////////////////////////////////////////////
      //  в случае если фильмы загружены в movieCards
    } else {
      setIsLoading(true);
      const resultSearchMovie = [];
      const resultSearchByInputForCheckbox = [];
      movieCards.forEach((movie) => {
        if (movie.nameRU.toLowerCase().includes(inputSearch.toLowerCase()) || movie.nameEN.toLowerCase().includes(inputSearch.toLowerCase())) { //убрать чувствительность к регистру
          resultSearchByInputForCheckbox.push(movie);
          localStorage.setItem('resultSearchByInputForCheckbox', JSON.stringify(resultSearchByInputForCheckbox));

          if (isShortFilm) {
            movie.duration <= 40 && resultSearchMovie.push(movie);
            localStorage.removeItem('checkedMovies');
          } else {
            resultSearchMovie.push(movie);
          }
        }
      })

      localStorage.setItem('findedMovies', JSON.stringify(resultSearchMovie));
      setSearchMovieCards(JSON.parse(localStorage.getItem('findedMovies')));
      setIsLoading(false);
      if (resultSearchMovie.length === 0) {
        localStorage.removeItem('findedMovies')
        setMovieNotFound('Ничего не найдено')
      } else {
        setMovieNotFound('')
      }
      if (resultSearchByInputForCheckbox.length === 0) {
        localStorage.removeItem('resultSearchByInputForCheckbox')
      }
    }
  }

  // поиск  по инпуту среди сохраненных фильмов
  function handleSearchSaveMovie(inputSearch) {

    // тут надо написать условие, что если  есть сохраненные карточки то производим поиск
    if (localStorage.getItem('savedMovieCards')) {

      setIsLoadingSavedMovie(true);
      const resultSearchSavedMovie = [];
      const resultSearchSavedMovieByInputForCheckbox = [];
      JSON.parse(localStorage.getItem('savedMovieCards')).forEach((movie) => { //среди сохраненных пользовательских ищем по инпут запросу
        if (movie.nameRU.toLowerCase().includes(inputSearch.toLowerCase()) || movie.nameEN.toLowerCase().includes(inputSearch.toLowerCase())) {

          resultSearchSavedMovieByInputForCheckbox.push(movie);
          localStorage.setItem('resultSearchSavedMovieByInputForCheckbox', JSON.stringify(resultSearchSavedMovieByInputForCheckbox));


          if (isShortFilmSaveMovie) {
            movie.duration <= 40 && resultSearchSavedMovie.push(movie);
            localStorage.removeItem('checkedSaveMovies');
          } else {
            resultSearchSavedMovie.push(movie);
          }
        }
      })

      localStorage.setItem('findedSaveMovies', JSON.stringify(resultSearchSavedMovie));
      setSavedMovieCards(JSON.parse(localStorage.getItem('findedSaveMovies')));
      setIsLoadingSavedMovie(false);


      if (resultSearchSavedMovie.length === 0) {
        localStorage.removeItem('findedSaveMovies')
        setSaveMovieNotFound('Ничего не найдено')
      } else {
        setSaveMovieNotFound('')
      }
      if (resultSearchSavedMovieByInputForCheckbox.length === 0) {
        localStorage.removeItem('resultSearchSavedMovieByInputForCheckbox')
      }
    }
  }

  // переключатель чек-бокс для поиска короткометражных фильмов
  function handleShortFilm() {

    setIsShortFilm(!isShortFilm) //чтобы переключался
    localStorage.setItem('shortFilmStatus', !isShortFilm)

    if ((localStorage.getItem('findedMovies')) || (localStorage.getItem('resultSearchByInputForCheckbox'))) {

      const resultSearchMovie = [];

      if (!isShortFilm) {
        if (localStorage.getItem('findedMovies')) {
          JSON.parse(localStorage.getItem('findedMovies')).forEach((movie) => {
            movie.duration <= 40 && resultSearchMovie.push(movie);
          })
        }
        localStorage.setItem('checkedMovies', JSON.stringify(resultSearchMovie));
        setSearchMovieCards(JSON.parse(localStorage.getItem('checkedMovies')))
        if (!localStorage.getItem('findedMovies')) {
          setMovieNotFound('Ничего не найдено')
        }

      } else {
        if (localStorage.getItem('resultSearchByInputForCheckbox')) {
          setMovieNotFound('')
        }

        localStorage.removeItem('checkedMovies');
        setSearchMovieCards(JSON.parse(localStorage.getItem('resultSearchByInputForCheckbox')))
      }
    }
  }

  // переключатель чек-бокс для поиска СОХРАНЕННЫХ короткометражных фильмов
  function handleShortSaveFilm() {
    setIsShortFilmSaveMovie(!isShortFilmSaveMovie)

    if (localStorage.getItem('savedMovieCards')) {

      const resultCheckSavedMovie = [];
      const resultChekedFromInputForCheckbox = [];

      if (!isShortFilmSaveMovie) {////////////////


        // после поиска в инпуте
        if (localStorage.getItem('resultSearchSavedMovieByInputForCheckbox')) {
          console.log((localStorage.getItem('resultSearchSavedMovieByInputForCheckbox')))

          JSON.parse(localStorage.getItem('resultSearchSavedMovieByInputForCheckbox')).forEach((movie) => { //среди сохраненных пользовательских ищем
            movie.duration <= 40 && resultChekedFromInputForCheckbox.push(movie);

            localStorage.setItem('checkedFromInputForCheckbox', JSON.stringify(resultChekedFromInputForCheckbox));

            setSavedMovieCards(JSON.parse(localStorage.getItem('checkedFromInputForCheckbox')))
          })
        } else {

          // сохраненные
          JSON.parse(localStorage.getItem('savedMovieCards')).forEach((movie) => { //среди сохраненных пользовательских ищем
            movie.duration <= 40 && resultCheckSavedMovie.push(movie);
          })
          localStorage.setItem('checkedSaveMovies', JSON.stringify(resultCheckSavedMovie));
          setSavedMovieCards(JSON.parse(localStorage.getItem('checkedSaveMovies')))
        }

      } else {
        if (localStorage.getItem('resultSearchSavedMovieByInputForCheckbox')) {
          localStorage.removeItem('checkedFromInputForCheckbox');
          setSavedMovieCards(JSON.parse(localStorage.getItem('resultSearchSavedMovieByInputForCheckbox')))
        } else {
          localStorage.removeItem('checkedSaveMovies');
          setSavedMovieCards(JSON.parse(localStorage.getItem('savedMovieCards')))
        }
      }
    }
  }

  // запрос сохраненных пользователем фильмов
  function getUserMovies() {
    setIsLoadingSavedMovie(true);
    mainApi
      .getUserMovies()
      .then((savedMovies) => {
        setSavedMovieCards(savedMovies);
        localStorage.setItem('savedMovieCards', JSON.stringify(savedMovies));
      })
      .catch((err) => {
        console.log(err.message);
        setMovieNotFound('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
      })
      .finally(() => {
        setIsLoadingSavedMovie(false);
      })
  }

  function saveMovieCardsActive(movieCard) {
    return savedMovieCards.some(
      (c) => c.nameRU === movieCard.nameRU
    );
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

    const searchId = movie.id ? movie.id : movie.movieId;
    const movieDelete = savedMovieCards.find((savedCard) => {
      return savedCard.movieId === searchId;
    });
    mainApi
      .deleteUserMovie(movieDelete._id)
      .then(() => {
        const savedMovieAfterDelete = savedMovieCards.filter((с) => с._id !== movieDelete._id);
        localStorage.setItem('savedMovieCards', JSON.stringify(savedMovieAfterDelete));
        setSavedMovieCards(savedMovieAfterDelete);
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
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [])

  useEffect(() => {
    if (loggedIn) {
      if (localStorage.getItem('savedMovieCards')) {
        setSavedMovieCards(JSON.parse(localStorage.getItem('savedMovieCards')));
      } else {
        getUserMovies();
      }
    }

  }, [loggedIn]);

  useEffect(() => {
    handleCheckToken();
  }, [loggedIn])



  useEffect(() => {
    // для сохранения при обновлении страницы поискового запроса на роуте movies
    if (localStorage.getItem('inputSearch')) {
      setCurrentInputQuery(localStorage.getItem('inputSearch'));
    }


    if (localStorage.getItem('savedMovieCards')) {
      setSavedMovieCards(JSON.parse(localStorage.getItem('savedMovieCards'))); //сохраненные по поиску для роута saved-movies
    }

    if (localStorage.getItem('shortFilmStatus')) {
      setIsShortFilm(JSON.parse(localStorage.getItem('shortFilmStatus'))); //состояние чекбокса роута movies
    }

    if (localStorage.getItem('checkedMovies')) {
      setSearchMovieCards(JSON.parse(localStorage.getItem('checkedMovies'))); //найденные по чекбоксу для роута movies
    }

    if (localStorage.getItem('resultSearchByInputForCheckbox')) {
      if (isShortFilm) {
        if (localStorage.getItem('checkedMovies')) {
          setSearchMovieCards(JSON.parse(localStorage.getItem('checkedMovies'))); //найденные по чекбоксу для роута movies
        }
      } else {
        setSearchMovieCards(JSON.parse(localStorage.getItem('resultSearchByInputForCheckbox'))); //найденные по чекбоксу для роута movies
      }
    }

    localStorage.removeItem('resultSearchSavedMovieByInputForCheckbox');
    localStorage.removeItem('checkedFromInputForCheckbox');

    setIsShortFilmSaveMovie(false); // для переключения чек бокса в неактивное состояние при обновлении или переходе

    // для сохранения при обновлении страницы найденных по запросу фильмов на роуте movies
    if (localStorage.getItem('findedMovies')) {
      setSearchMovieCards(JSON.parse(localStorage.getItem('findedMovies'))); //найденные по поиску для роута movies
    }

  }, [loggedIn, navigate]);


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
          <Header
            loggedIn={loggedIn}
          />

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
              preloaderMessage={movieNotFound}

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
              preloaderMessage={saveMovieNotFound}
            />} />

            <Route path='/profile' element={<ProtectedRouteElement
              element={Profile}
              loggedIn={loggedIn}
              onUpdateUser={handleUpdateUser}
              onSignOut={onSignOut}
              errorMessage={errorMessageProfile}
              successMessage={successMessageProfile}
            />} />

            <Route path='/signup' element={<Register
              onRegistration={handleRegistration}
              errorMessage={errorMessageRegister}
            />} />

            <Route path='/signin' element={<Login
              onAuthorization={handleAuthorization}
              errorMessage={errorMessageLogin}
            />} />
            <Route path='/*' element={<PageNotFound />} />
          </Routes>

          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;