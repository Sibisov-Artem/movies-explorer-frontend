import './SearchForm.css';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {

  return (

    <section className="search-form">

      <form className="search-form__form">

        <fieldset className="search-form__input-container">
          <input className="search-form__input hover" type="text" name="movie" placeholder="Фильм" required />
          <button className="search-form__submit-btn hover" type="submit"></button>
        </fieldset>

        <div className="search-form__filter">
          <FilterCheckbox />
          <p className="search-form__filter-caption">Короткометражки</p>
        </div>

      </form>

    </section >
  );
}

export default SearchForm;