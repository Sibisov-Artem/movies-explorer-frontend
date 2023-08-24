import './App.css';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';

import { Routes, Route } from 'react-router-dom';
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

function App() {

  const [movieCards, setMoviesCards] = useState([]);

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

  return (
    <div className="root">
      <div className="page">
        <Header />

        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={<Movies movieCards={movieCards}
          />} />
          <Route path='/saved-movies' element={<SavedMovies />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}

export default App;