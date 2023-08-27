import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesMore from '../MoviesMore/MoviesMore';


function SavedMovies({ movieCards,
  onMovieCardLikeOff,
  onSearchMovie,
}) {
  return (
    <main className="saved-movies">
      <SearchForm
        onSearchMovie={onSearchMovie}
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