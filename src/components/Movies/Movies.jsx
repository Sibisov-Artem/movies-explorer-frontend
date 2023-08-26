import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesMore from '../MoviesMore/MoviesMore';

function Movies({ movieCards, saveActive, onMovieCardLikeOff, onMovieCardLike }) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList
        movieCards={movieCards}
        saveActive={saveActive}
        onMovieCardLike={onMovieCardLike}
        onMovieCardLikeOff={onMovieCardLikeOff}
      />
      <MoviesMore />
    </main>
  );
}

export default Movies;