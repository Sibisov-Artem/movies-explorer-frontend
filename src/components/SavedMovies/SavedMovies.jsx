import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader'


function SavedMovies({
  movieCards,
  onMovieCardLikeOff,
  onSearchMovie,
  currentInputQuery,
  handleShortFilm,
  isShortFilm,
  isLoading,
  preloaderMessage,
}) {

  return (
    <main className="saved-movies">
      <SearchForm
        onSearchMovie={onSearchMovie}
        currentInputQuery={currentInputQuery}
        handleShortFilm={handleShortFilm}
        isShortFilm={isShortFilm}
      />

      {isLoading ? <Preloader /> :
        // Если ничего не найдено, на месте прелоадера появляется надпись «Ничего не найдено».
        // Если в процессе получения и обработки данных происходит ошибка, в окне результатов выводится надпись:
        // «Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
        // Подождите немного и попробуйте ещё раз».

        preloaderMessage ? (
          <p className='saved-movies__preloader-message'>{preloaderMessage}</p>
        ) : (

          <>
            <MoviesCardList
              movieCards={movieCards}
              onMovieCardLikeOff={onMovieCardLikeOff}
            />
          </>)}

    </main>
  );
}

export default SavedMovies;