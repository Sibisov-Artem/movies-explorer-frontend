import './Movies.css';

import { useState, useEffect } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesMore from '../MoviesMore/MoviesMore';
import Preloader from '../Preloader/Preloader'

import {
  QUANTITY_MOVIE_FOR_BIG_SIZE_WINDOW,
  QUANTITY_MOVIE_FOR_MEDIUM_SIZE_WINDOW,
  QUANTITY_MOVIE_FOR_SMALL_SIZE_WINDOW,
  LOAD_MORE_MOVIE_FOR_BIG_SIZE_WINDOW,
  LOAD_MORE_MOVIE_FOR_MEDIUM_SIZE_WINDOW,
  LOAD_MORE_MOVIE_FOR_SMALL_SIZE_WINDOW,
  SIZE_WINDOW
} from '../../utils/constants.js'

function Movies({ movieCards,
  saveActive,
  onMovieCardLikeOff,
  onMovieCardLike,
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
    if (window.innerWidth >= SIZE_WINDOW.big) {
      setCardForDisplay(QUANTITY_MOVIE_FOR_BIG_SIZE_WINDOW)

    } else if (window.innerWidth < SIZE_WINDOW.small) {
      setCardForDisplay(QUANTITY_MOVIE_FOR_SMALL_SIZE_WINDOW)

    } else {
      setCardForDisplay(QUANTITY_MOVIE_FOR_MEDIUM_SIZE_WINDOW)
    }
  }

  function refreshQuantity() {
    if (window.innerWidth >= SIZE_WINDOW.big) {
      setCardForDisplay(QUANTITY_MOVIE_FOR_BIG_SIZE_WINDOW)

    } else if (window.innerWidth < SIZE_WINDOW.small) {
      setCardForDisplay(QUANTITY_MOVIE_FOR_SMALL_SIZE_WINDOW)

    } else {
      setCardForDisplay(QUANTITY_MOVIE_FOR_MEDIUM_SIZE_WINDOW)
    }
  }

  useEffect(() => {
    showQuantityOnSize();
  }, []
  )

  //слушатель resize для синхронного изменения кол-ва к показу
  //в зависимости от изменения разрешения
  // и  удаление слушателя
  useEffect(() => {
    window.addEventListener('resize', showQuantityOnSize);
    // Все обработчики, добавленные через addEventListener, удаляются при размонтировании компонента.
    return () => {
      window.removeEventListener('resize', showQuantityOnSize);
    };

  }, []);


  function loadMore() {
    if (window.innerWidth >= SIZE_WINDOW.big) {
      setCardForDisplay(cardForDisplay + LOAD_MORE_MOVIE_FOR_BIG_SIZE_WINDOW)

    } else if (window.innerWidth < SIZE_WINDOW.small) {
      setCardForDisplay(cardForDisplay + LOAD_MORE_MOVIE_FOR_SMALL_SIZE_WINDOW)

    } else {
      setCardForDisplay(cardForDisplay + LOAD_MORE_MOVIE_FOR_MEDIUM_SIZE_WINDOW)
    }

  }

  return (
    <main className="movies">
      <SearchForm
        onSearchMovie={onSearchMovie}
        currentInputQuery={currentInputQuery}
        handleShortFilm={handleShortFilm}
        isShortFilm={isShortFilm}
        refreshQuantity={refreshQuantity}
      />

      {isLoading ? <Preloader /> :
        // Если ничего не найдено, на месте прелоадера появляется надпись «Ничего не найдено».
        //Если в процессе получения и обработки данных происходит ошибка, в окне результатов выводится надпись:
        //«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
        // Подождите немного и попробуйте ещё раз».

        preloaderMessage ? (
          <p className='movies__preloader-message'>{preloaderMessage}</p>
        ) : (

          <>
            <MoviesCardList
              movieCards={movieCards}
              saveActive={saveActive}
              onMovieCardLike={onMovieCardLike}
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

export default Movies;