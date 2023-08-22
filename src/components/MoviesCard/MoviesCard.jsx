import './MoviesCard.css';

import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function MoviesCard({ movie }) {

  const location = useLocation();

  const [likeActive, setLikeActive] = useState(false);
  function handleLikeClick() {          // обработчик управления кнопки лайка,
    setLikeActive(!likeActive);
  }

  return (
    <li className="movies-card ">
      <img className="movies-card__image" src={movie.posterMovie} alt={`Кадр из фильма "${movie.nameMovie}"`}></img>
      <div className="movies-card__info-wrapper">
        <div className="movies-card__info">
          <h2 className="movies-card__title">{movie.nameMovie}</h2>
          <p className="movies-card__duration">{movie.duration}</p>
        </div>
        <button className={`hover
               ${location.pathname === "/saved-movies" ? "movies-card__delete-btn" : "movies-card__like-btn"}
               ${location.pathname === "/movies" & (movie.isLicked || likeActive) ? "movies-card__like-btn_active" : ""}
        `}
          onClick={handleLikeClick} ></button>
      </div>
    </li >
  );
}

export default MoviesCard;