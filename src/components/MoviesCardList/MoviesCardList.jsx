import './MoviesCardList.css';



import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ array }) {
  return (
    <section className="movies-cards">
      <ul className="movies-cards__grid">

        {array.map((movieCard) => (
          <MoviesCard
            movie={movieCard}
            key={movieCard._id}
          />
        ))}

      </ul>
    </section>
  );
}

export default MoviesCardList;