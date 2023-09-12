import './Header.css';

import { useLocation, Link } from 'react-router-dom';
import { useState, useCallback } from 'react';

import Navigation from '../Navigation/Navigation';
import Burger from '../Burger/Burger';

// Нужна логика, когда находмися в Main то бэкграунд темно-синий
// В остальных случаях кроме 404, логин, регистрации (где хэдера нет вовсе) - хэдер
// темно-серый. Нужно создать класс для хэдера для этого случая

function Header({ loggedIn }) {

  const location = useLocation();

  const [burgerActive, setBurgerActive] = useState(false);

  function handleBurgerClick() {        // обработчик управления состояния кнопки бургера,
    setBurgerActive(!burgerActive);     // от него зависят стили в Navigation(менюшка) и визулизация кнопочки-бургера
    if (!burgerActive) {
      document.addEventListener('keydown', closeBurgerOnEscape)
    } else {
      document.removeEventListener('keydown', closeBurgerOnEscape)
    }
  }

  const closeBurgerOnEscape = useCallback((evt) => {
    if (evt.key === "Escape") {
      setBurgerActive(false);
      document.removeEventListener('keydown', closeBurgerOnEscape)
      console.log(evt.target)
      console.log(evt.currentTarget)
    }
  }, [])

  const closeBurgerOnOverlay = useCallback((evt) => {
    if (evt.target === evt.currentTarget) { // ((evt.target === evt.currentTarget) || (evt.key === "Escape"))
      setBurgerActive(false);
      document.removeEventListener('keydown', closeBurgerOnEscape)
    }
  }, [closeBurgerOnEscape])

  return (
    <>
      {location.pathname === "/" ||
        location.pathname === "/movies" ||
        location.pathname === "/saved-movies" ||
        location.pathname === "/profile" ?
        (
          <header className={`header section header_background-theme_${location.pathname === "/" ? "main" : "other"}`}>
            <Link to="/" className="header__link hover">
              <div className="logo"></div>
            </Link>
            <Navigation
              burgerActive={burgerActive}
              loggedIn={loggedIn}
              closeBurgerOnOverlay={closeBurgerOnOverlay}
            />
            {!loggedIn ?
              (null) : (
                <Burger
                  burgerClick={handleBurgerClick}     // нажатие кнопки в Burger.jsx
                  burgerActive={burgerActive} />)}
          </header>
        ) : (
          null
        )}
    </>

  );
}

export default Header;