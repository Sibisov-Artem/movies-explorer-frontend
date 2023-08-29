import './SearchForm.css';

import { useState, useEffect } from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';



function SearchForm({ onSearchMovie, currentInputQuery, handleShortFilm, isShortFilm }) {

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSearchQuery(currentInputQuery)
  }, []);

  function handleChangeQuery(e) {
    setSearchQuery(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    onSearchMovie(searchQuery);
  }

  //===============================================================================
  return (

    <section className="search-form">

      <form className="search-form__form" onSubmit={onSubmit}>

        <fieldset className="search-form__input-container">
          <input className="search-form__input hover"
            type="text"
            name="movie"
            placeholder="Фильм"
            required
            onChange={handleChangeQuery}
            defaultValue={currentInputQuery} />
          <button className="search-form__submit-btn hover" type="submit"></button>
        </fieldset>

        <div className="search-form__filter">
          <FilterCheckbox
            handleShortFilm={handleShortFilm}
            isShortFilm={isShortFilm} />
          <p className="search-form__filter-caption">Короткометражки</p>
        </div>

      </form>

    </section >
  );
}

export default SearchForm;