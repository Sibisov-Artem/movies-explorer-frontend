import './App.css';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';

import { Routes, Route, useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const [movieCards, setMoviesCards] = useState([]);

  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });

  useEffect(() => {
    moviesApi.getMovies()
      .then((data) => {
        setMoviesCards(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, [])
  ////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    mainApi.getUser()
      .then((data) => {
        setCurrentUser(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, [])

  function handleUpdateUser(inputData) {
    mainApi.editUser(inputData)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />

          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/movies' element={<Movies movieCards={movieCards}
            />} />
            <Route path='/saved-movies' element={<SavedMovies />} />
            <Route path='/profile' element={<Profile onUpdateUser={handleUpdateUser} />} />
            <Route path='/signup' element={<Register onRegistration={handleRegistration} />} />
            <Route path='/signin' element={<Login />} />
            <Route path='/*' element={<PageNotFound />} />
          </Routes>

          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;