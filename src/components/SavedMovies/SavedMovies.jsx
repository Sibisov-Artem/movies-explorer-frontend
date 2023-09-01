import './SavedMovies.css';

import { useState, useEffect } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesMore from '../MoviesMore/MoviesMore';
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

  const [cardForDisplay, setCardForDisplay] = useState([])

  // // при разрешении экрана >= 1280 показывать первоначально 12шт, потом добавлять по 3шт
  // // при разрешении экрана < 1280 показывать первоначально 8шт, потом добавлять по 2шт
  // // при разрешении экрана < 600 показывать первоначально 5шт, потом добавлять по 2шт
  function showQuantityOnSize() {
    if (window.innerWidth >= 1280) {
      setCardForDisplay(12)
    } else if (window.innerWidth < 600) {
      setCardForDisplay(5)
    } else {
      setCardForDisplay(8)
    }
  }

  useEffect(() => {
    showQuantityOnSize();
  }, []
  )

  //слушатель resize для синхронного изменения кол-ва к показу
  //в зависимости от изменнеия разрешения с ограничением по времени setTimeout
  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', showQuantityOnSize);
    }, 1000);
  }, []);

  function loadMore() {
    console.log(123)
    if (window.innerWidth >= 1280) {
      setCardForDisplay(cardForDisplay + 3)
    } else if (window.innerWidth < 600) {
      setCardForDisplay(cardForDisplay + 2)
    } else {
      setCardForDisplay(cardForDisplay + 2)
    }
  }

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
              cardForDisplay={cardForDisplay}
            />
            <MoviesMore
              handleLoadClick={loadMore}
              isMoreActive={movieCards.length > cardForDisplay ? true : false}
            />
          </>)}

    </main>
  );
}

export default SavedMovies;