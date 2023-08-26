import './MoviesCardList.css';



import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movieCards, saveActive, handleDeleteClick, onMovieCardLike }) {
  return (
    <section className="movies-cards">
      <ul className="movies-cards__grid">

        {movieCards.map((movieCard) => (
          <MoviesCard
            movieCard={movieCard}
            key={movieCard.id}
            saveActive={saveActive}
            handleDeleteClick={handleDeleteClick}
            onMovieCardLike={onMovieCardLike}
          />
        ))}

      </ul>
    </section>
  );
}

export default MoviesCardList;