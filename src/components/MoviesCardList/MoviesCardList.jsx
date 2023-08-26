import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movieCards, saveActive, onMovieCardLikeOff, onMovieCardLike }) {

  return (
    <section className="movies-cards">
      <ul className="movies-cards__grid">

        {movieCards.map((movieCard) => (
          <MoviesCard
            movieCard={movieCard}
            key={movieCard.id || movieCard._id}
            saveActive={saveActive}
            onMovieCardLike={onMovieCardLike}
            onMovieCardLikeOff={onMovieCardLikeOff}
          />
        ))}

      </ul>
    </section>
  );
}

export default MoviesCardList;