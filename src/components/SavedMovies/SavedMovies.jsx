import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesMore from '../MoviesMore/MoviesMore';


function SavedMovies({ movieCards }) {
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList
        movieCards={movieCards} />
      <MoviesMore />
    </main>
  );
}

export default SavedMovies;