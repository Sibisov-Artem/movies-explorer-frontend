import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesMore from '../MoviesMore/MoviesMore';

function Movies({ movieCards }) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList
        movieCards={movieCards} />
      <MoviesMore />
    </main>
  );
}

export default Movies;