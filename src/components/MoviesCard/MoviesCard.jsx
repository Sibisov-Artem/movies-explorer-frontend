import './MoviesCard.css';

import { useLocation } from 'react-router-dom';

function MoviesCard({ movieCard, saveActive, onMovieCardLikeOff, onMovieCardLike }) {

  const location = useLocation();

  const countDuration = `${Math.floor(movieCard.duration / 60)}ч ${movieCard.duration % 60}м`;

  function handleLikeClick() {
    onMovieCardLike(movieCard)
  }

  function handleDeleteClick() {
    onMovieCardLikeOff(movieCard)
  }

  return (
    <li className="movies-card ">
      <a className="movies-card__link" href={`${movieCard.trailerLink}`} target="_blank" rel="noreferrer">
        <img className="movies-card__image"
          src={`${location.pathname === "/movies" ? `https://api.nomoreparties.co${movieCard.image.url}` : movieCard.image}`}
          alt={`Кадр из фильма "${movieCard.nameRU}"`}></img>
      </a>
      <div className="movies-card__info-wrapper">
        <div className="movies-card__info">
          <h2 className="movies-card__title">{movieCard.nameRU}</h2>
          <p className="movies-card__duration">{countDuration}</p>
        </div>

        {location.pathname === "/movies" && (
          <button className={
            saveActive(movieCard) ? "hover movies-card__like-btn_active" : "hover movies-card__like-btn"}
            type="button"
            onClick={saveActive(movieCard) ? handleDeleteClick : handleLikeClick}></button>
        )}

        {location.pathname === "/saved-movies" && (
          <button className="hover movies-card__delete-btn"
            type="button"
            onClick={handleDeleteClick}></button>
        )}

      </div>
    </li >
  );
}

export default MoviesCard;