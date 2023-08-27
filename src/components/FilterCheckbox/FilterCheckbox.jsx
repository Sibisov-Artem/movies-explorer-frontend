import './FilterCheckbox.css';

function FilterCheckbox({ handleShortFilm, isShortFilm }) {

  function onClick() {
    handleShortFilm()
  }

  return (
    <label className="filter-checkbox hover">
      <input className="filter-checkbox__input"
        // "filter-checkbox__input filter-checkbox__input_active"
        type="checkbox"
        name="checkbox"
        defaultChecked={isShortFilm}
        onClick={onClick}
      />
      <span className="filter-checkbox__mark"></span>
    </label>

  );
}

export default FilterCheckbox;