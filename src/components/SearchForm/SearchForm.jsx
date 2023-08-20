import './SearchForm.css';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {

  return (

    <div className="search-form">

      <form className="search-form__form">

        <fieldset className="search-form__input-container">
          <input className="search-form__input" type="text" name="movie" placeholder="Фильм" required />
          <button className="search-form__submit-btn" type="submit"></button>
        </fieldset>

      </form>

      <div className="search-form__filter">
        <FilterCheckbox />
        <p className="search-form__filter-caption">Короткометражки</p>
      </div>

    </div >
  );
}

export default SearchForm;