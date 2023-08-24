import './MoviesCardList.css';



import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movieCards }) {
  return (
    <section className="movies-cards">
      <ul className="movies-cards__grid">

        {movieCards.map((movieCard) => (
          <MoviesCard
            movieCard={movieCard}
            key={movieCard.id}
          />
        ))}

      </ul>
    </section>
  );
}

export default MoviesCardList;