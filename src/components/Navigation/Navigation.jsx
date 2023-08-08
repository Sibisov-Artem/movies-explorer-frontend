import './Navigation.css';

import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/signup" className="navigation__link">Регистрация</Link>
      <Link to="/signin" className="navigation__link navigation__link_signin">Войти</Link>
    </nav>
  );
}

export default Navigation;