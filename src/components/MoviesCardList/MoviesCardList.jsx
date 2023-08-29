import './MoviesCardList.css';

import { useState, useEffect } from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movieCards, saveActive, onMovieCardLikeOff, onMovieCardLike }) {

  // // при разрешении экрана >= 1280 показывать первоначально 12шт, потом добавлять по 3шт
  // // при разрешении экрана < 1280 показывать первоначально 8шт, потом добавлять по 2шт
  // // при разрешении экрана < 600 показывать первоначально 5шт, потом добавлять по 2шт
  const [cardForDisplay, setCardForDisplay] = useState([])

  function showQuantityOnSize() {
    if (window.innerWidth >= 1280) {
      setCardForDisplay(movieCards.slice(0, 12))

    } else if (window.innerWidth < 600) {
      setCardForDisplay(movieCards.slice(0, 5))

    } else {
      setCardForDisplay(movieCards.slice(0, 8))
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
      window.addEventListener("resize", showQuantityOnSize());
    }, 1000);
  });



  // // if (window.innerWidth >= 1280) {

  // // }
  // // if window.innerWidth < 1280 // по 2 карточки
  // // if window.innerWidth < 590 // по 1 карточке


  return (
    <section className="movies-cards">
      <ul className="movies-cards__grid">

        {cardForDisplay.map((movieCard) => (
          <MoviesCard
            movieCard={movieCard}
            key={movieCard.id || movieCard._id}
            saveActive={saveActive}
            onMovieCardLike={onMovieCardLike}
            onMovieCardLikeOff={onMovieCardLikeOff}
          />
        ))}

      </ul>
    </section>
  );
}

export default MoviesCardList;