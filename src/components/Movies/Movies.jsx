import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesMore from '../MoviesMore/MoviesMore';

import { moviesArray } from '../../utils/moviesArray'

function Movies() {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList
        array={moviesArray} />
      <MoviesMore />
    </main>
  );
}

export default Movies;