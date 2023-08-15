import './MoviesCard.css';

import image from '../../images/image-movie-example.jpg';

function MoviesCard() {

  const movieExample = { nameMovie: '33 слова о дизайне', posterMovie: image, duration: '1ч 47м' }

  return (
    <li className="movies-card">
      <img className="movies-card__image" src={movieExample.posterMovie} alt={`Кадр из фильма "${movieExample.nameMovie}"`}></img>
      <div className="movies-card__info-wrapper">
        <div className="movies-card__info">
          <h2 className="movies-card__title">{movieExample.nameMovie}</h2>
          <p className="movies-card__duration">{movieExample.duration}</p>
        </div>
        <button className="movies-card__like-btn "></button>
      </div>
    </li >
  );
}

export default MoviesCard;