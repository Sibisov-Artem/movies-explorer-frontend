import './FilterCheckbox.css';

function FilterCheckbox() {
  return (

    <label className="filter-checkbox hover">
      <input className="filter-checkbox__input" type="checkbox" name="checkbox" />
      <span className="filter-checkbox__mark"></span>
    </label>

  );
}

export default FilterCheckbox;