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

  const [movieCards, setMoviesCards] = useState([]);
  const [savedMovieCards, setSavedMovieCards] = useState([]);

  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });

  const [loggedIn, setLoggedIn] = useState(false);


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
      moviesApi.getMovies()
        .then((data) => {
          setMoviesCards(data);
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
    setLoggedIn(false);
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />

          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/movies' element={<Movies movieCards={movieCards}
            />} />
            <Route path='/saved-movies' element={<SavedMovies movieCards={savedMovieCards} />} />
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