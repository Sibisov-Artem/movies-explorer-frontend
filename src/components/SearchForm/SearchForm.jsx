import './SearchForm.css';

import { useState, useEffect } from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';



function SearchForm({ onSearchMovie, currentInputQuery, handleShortFilm, isShortFilm, onSubmit, refreshQuantity }) {

  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setSearchQuery(currentInputQuery)
  }, []);

  function handleChangeQuery(e) {
    setSearchQuery(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (searchQuery) {
      refreshQuantity();
      setErrorMessage('');
      onSearchMovie(searchQuery);
    } else {
      setErrorMessage('Нужно ввести ключевое слово');
    }
  }

  //===============================================================================
  return (

    <section className="search-form">

      <form className="search-form__form"
        onSubmit={onSubmit}
        noValidate>

        <fieldset className="search-form__input-container">
          <input className="search-form__input hover"
            type="text"
            name="movie"
            placeholder="Фильм"
            onChange={handleChangeQuery}
            required
            defaultValue={currentInputQuery} />
          <button className="search-form__submit-btn hover" type="submit"></button>
        </fieldset>

        <span className="search-form__message-error">{errorMessage}</span>

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