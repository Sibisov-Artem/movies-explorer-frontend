import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesMore from '../MoviesMore/MoviesMore';

import { savedMoviesArray } from '../../utils/moviesArray'

function SavedMovies() {
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList
        array={savedMoviesArray} />
      <MoviesMore />
    </main>
  );
}

export default SavedMovies;