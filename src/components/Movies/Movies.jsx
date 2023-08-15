import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesMore from '../MoviesMore/MoviesMore';

function Movies() {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList />
      <MoviesMore />
    </main>
  );
}

export default Movies;