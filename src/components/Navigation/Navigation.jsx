import './Navigation.css';

import { Link, useLocation } from 'react-router-dom';

function Navigation({ burgerActive }) {

  const location = useLocation();

  return (
    <nav className="navigation">
      {location.pathname === "/" ? (
        <ul className="navigation__list_main">
          <li class="navigation__item">
            <Link to="/signup" className="navigation__link navigation__link_place_main hover">Регистрация</Link>
          </li>
          <li class="navigation__item">
            <Link to="/signin" className="navigation__link navigation__link_place_main navigation__link_target_signin hover">Войти</Link>
          </li>
        </ul>
      ) : (
        <div className={`navigation__opacity-background ${burgerActive && "navigation__opacity-background_active"}`}>
          <ul className="navigation__list_other">

            <li class="navigation__item navigation__item-burger">
              <Link to="/" className="navigation__link navigation__link_place_other hover">Главная</Link>
            </li>

            <li class="navigation__item">
              <Link to="/movies" className="navigation__link navigation__link_place_other navigation__link_target_movies hover">Фильмы</Link>
            </li>

            <li class="navigation__item">
              <Link to="/saved-movies" className="navigation__link navigation__link_place_other navigation__link_target_saved-movies hover">Сохранённые фильмы</Link>
            </li>

            <li class="navigation__item navigation__item_target_profile">
              <Link to="/profile" className="navigation__link navigation__link_place_other navigation__link_target_profile hover">
                Аккаунт <div className="navigation__profile-icon" > </div>
              </Link></li>
          </ul>
        </div>
      )
      }
    </nav >

  );
}


export default Navigation;