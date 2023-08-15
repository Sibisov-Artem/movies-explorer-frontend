import './MoviesCard.css';

function MoviesCard({ movie }) {

  return (
    <li className="movies-card">
      <img className="movies-card__image" src={movie.posterMovie} alt={`Кадр из фильма "${movie.nameMovie}"`}></img>
      <div className="movies-card__info-wrapper">
        <div className="movies-card__info">
          <h2 className="movies-card__title">{movie.nameMovie}</h2>
          <p className="movies-card__duration">{movie.duration}</p>
        </div>
        <button className="movies-card__like-btn "></button>
      </div>
    </li >
  );
}

export default MoviesCard;