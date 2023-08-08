import './Navigation.css';

import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation">
      <ul className='navigation__list'>
        <li><Link to="/signup" className="navigation__link">Регистрация</Link></li>
        <li><Link to="/signin" className="navigation__link navigation__link_signin">Войти</Link></li>
      </ul>
    </nav >
  );
}

export default Navigation;