import './MoviesMore.css'


function MoviesMore({ handleLoadClick, isMoreActive }) {

  return (
    <div className="movies-more">
      <button className={`movies-more__btn hover ${isMoreActive && "movies-more__btn_active"} `}
        type="button"
        onClick={handleLoadClick}
      >Ещё</button>
    </div>
  );
}

export default MoviesMore;
// movies-more__btn_disable hover