import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesMore from '../MoviesMore/MoviesMore';

function Movies({ movieCards, saveActive, handleDeleteClick, onMovieCardLike }) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList
        movieCards={movieCards}
        saveActive={saveActive}
        handleDeleteClick={handleDeleteClick}
        onMovieCardLike={onMovieCardLike}
      />
      <MoviesMore />
    </main>
  );
}

export default Movies;