import './MoviesMore.css'

import { useLocation } from 'react-router-dom';

function MoviesMore() {

  const location = useLocation();

  return (
    <>
      {location.pathname === "/movies" ?
        (
          <div className="movies-more">
            <button className="movies-more__btn hover">Ещё</button>
          </div>
        ) : (
          <div className="movies-more movies-more__not-visible section"></div>
        )}

    </>
  );
}

export default MoviesMore;