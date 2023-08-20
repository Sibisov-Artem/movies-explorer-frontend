import './Header.css';

import { useLocation } from 'react-router-dom';
import { useState } from 'react';

import Navigation from '../Navigation/Navigation';
import Burger from '../Burger/Burger';

// Нужна логика, когда находмися в Main то бэкграунд темно-синий
// В остальных случаях кроме 404, логин, регистрации (где хэдера нет вовсе) - хэдер
// темно-серый. Нужно создать класс для хэдера для этого случая

function Header() {

  const location = useLocation();

  const [burgerActive, setBurgerActive] = useState(false);
  function handleBurgerClick() {        // обработчик управления состояния кнопки бургера,
    setBurgerActive(!burgerActive);     // от него зависят стили в Navigation(менюшка) и визулизация кнопочки-бургера
  }


  return (
    <>
      {location.pathname === "/" ||
        location.pathname === "/movies" ||
        location.pathname === "/saved-movies" ||
        location.pathname === "/profile" ?
        (
          <header className={`header  header__background_theme_${location.pathname === "/" ? "main" : "other"}`}>
            <div className="logo"></div>
            <Navigation
              burgerActive={burgerActive} />
            <Burger
              burgerClick={handleBurgerClick}     // нажатие кнопки в Burger.jsx
              burgerActive={burgerActive} />
          </header>
        ) : (
          null
        )}
    </>

  );
}

export default Header;