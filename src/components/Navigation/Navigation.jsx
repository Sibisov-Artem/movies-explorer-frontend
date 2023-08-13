import './Navigation.css';

import { Link, useLocation } from 'react-router-dom';

function Navigation() {

  const location = useLocation();

  return (
    <nav className="navigation">
      {location.pathname === "/" ? (
        <ul className="navigation__list_main">
          <li class="navigation__item">
            <Link to="/signup" className="navigation__link navigation__link_place_main">Регистрация</Link>
          </li>
          <li class="navigation__item">
            <Link to="/signin" className="navigation__link navigation__link_place_main navigation__link_target_signin">Войти</Link>
          </li>
        </ul>
      ) : (
        <ul className="navigation__list_other">
          <li class="navigation__item">
            <Link to="/movies" className="navigation__link navigation__link_place_other navigation__link_target_movies">Фильмы</Link>
          </li>

          <li class="navigation__item">
            <Link to="/saved-movies" className="navigation__link navigation__link_place_other navigation__link_target_saved-movies">Сохранённые фильмы</Link>
          </li>

          <li class="navigation__item navigation__item_target_profile">
            <Link to="/profile" className="navigation__link navigation__link_place_other navigation__link_target_profile">
              Аккаунт <div className="navigation__profile-icon" > </div>
            </Link></li>

        </ul>
      )
      }
    </nav >

  );
}


export default Navigation;