import './Burger.css';

function Burger({ burgerClick, burgerActive }) {

  return (
    <button className={`burger hover ${burgerActive ? "burger_active" : ""}`} onClick={burgerClick}>
      <span className={`burger__central-line ${burgerActive ? "burger__central-line_disable" : ""}`} ></span>
    </button>
  );
}

export default Burger;