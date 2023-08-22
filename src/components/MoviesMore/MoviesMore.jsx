import './MoviesMore.css'

import { useLocation } from 'react-router-dom';

function MoviesMore() {

  const location = useLocation();

  return (
    <>
      {location.pathname === "/movies" ?
        (
          <div className="movies-more">
            <button className="movies-more__btn hover" type="button">Ещё</button>
          </div>
        ) : (
          <div className="movies-more movies-more_not-visible section"></div>
        )}

    </>
  );
}

export default MoviesMore;