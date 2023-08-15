import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import { savedMoviesArray } from '../../utils/moviesArray'

function SavedMovies() {
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList
        array={savedMoviesArray} />
    </main>
  );
}

export default SavedMovies;