import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesMore from '../MoviesMore/MoviesMore';

function Movies({ movieCards,
  saveActive,
  onMovieCardLikeOff,
  onMovieCardLike,
  onSearchMovie,
  currentInputQuery,
}) {
  return (
    <main className="movies">
      <SearchForm
        onSearchMovie={onSearchMovie}
        currentInputQuery={currentInputQuery}
      />

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