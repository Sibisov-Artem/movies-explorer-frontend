import './Burger.css';

function Burger({ burgerClick, burgerActive }) {

  return (
    <button className={`burger ${burgerActive && "burger_active"}`} onClick={burgerClick}>
      <div className={`burger__central-line ${burgerActive && "burger__central-line_disable"}`} ></div>
    </button>
  );
}

export default Burger;