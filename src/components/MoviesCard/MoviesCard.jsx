import './MoviesCard.css';

import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function MoviesCard({ movieCard }) {

  const location = useLocation();

  const [likeActive, setLikeActive] = useState(false);
  function handleLikeClick() {          // обработчик управления кнопки лайка,
    setLikeActive(!likeActive);
  }

  const countDuration = `${Math.floor(movieCard.duration / 60)}ч ${movieCard.duration % 60}м`;

  return (
    <li className="movies-card ">
      <a className="movies-card__link" href={`${movieCard.trailerLink}`} target="_blank">
        <img className="movies-card__image" src={`https://api.nomoreparties.co${movieCard.image.url}`} alt={`Кадр из фильма "${movieCard.nameRU}"`}></img>
      </a>
      <div className="movies-card__info-wrapper">
        <div className="movies-card__info">
          <h2 className="movies-card__title">{movieCard.nameRU}</h2>
          <p className="movies-card__duration">{countDuration}</p>
        </div>
        <button className={`hover
               ${location.pathname === "/saved-movies" ? "movies-card__delete-btn" : "movies-card__like-btn"}
               ${location.pathname === "/movies" & (likeActive) ? "movies-card__like-btn_active" : ""}
        `}
          type="button"
          onClick={handleLikeClick} ></button>
      </div>
    </li >
  );
}

export default MoviesCard;