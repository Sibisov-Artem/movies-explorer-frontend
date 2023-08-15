import './Header.css';

import { useLocation } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

// Нужна логика, когда находмися в Main то бэкграунд темно-синий
// В остальных случаях кроме 404, логин, регистрации (где хэдера нет вовсе) - хэдер
// темно-серый. Нужно создать класс для хэдера для этого случая

function Header() {

  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ||
        location.pathname === "/movies" ||
        location.pathname === "/saved-movies" ||
        location.pathname === "/profile" ?
        (
          <header className={`header section header__background_theme_${location.pathname === "/" ? "main" : "other"}`}>
            <div className="header__logo"></div>
            <Navigation />
          </header>
        ) : (
          null
        )}
    </>

  );
}

export default Header;