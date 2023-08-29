import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movieCards, saveActive, onMovieCardLikeOff, onMovieCardLike, cardForDisplay }) {

  return (
    <section className="movies-cards">
      <ul className="movies-cards__grid">

        {movieCards.slice(0, cardForDisplay).map((movieCard) => (
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