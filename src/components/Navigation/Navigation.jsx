import './Navigation.css';

import { Link } from "react-router-dom";

function Navigation() {
  return (
    <ul className="navigation">
      <li><Link to="/signup" className="navigation__link">Регистрация</Link></li>
      <li><Link to="/signin" className="navigation__link navigation__link_signin">Войти</Link></li>
    </ul>
  );
}

export default Navigation;