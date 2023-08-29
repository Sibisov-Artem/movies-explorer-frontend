import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesMore from '../MoviesMore/MoviesMore';


function SavedMovies({
  movieCards,
  onMovieCardLikeOff,
  onSearchMovie,
  currentInputQuery,
  handleShortFilm,
  isShortFilm,
}) {
  return (
    <main className="saved-movies">
      <SearchForm
        onSearchMovie={onSearchMovie}
        currentInputQuery={currentInputQuery}
        handleShortFilm={handleShortFilm}
        isShortFilm={isShortFilm}
      />
      <MoviesCardList
        movieCards={movieCards}
        onMovieCardLikeOff={onMovieCardLikeOff}
      />
      <MoviesMore />
    </main>
  );
}

export default SavedMovies;