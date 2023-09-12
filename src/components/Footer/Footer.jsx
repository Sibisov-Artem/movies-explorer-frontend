import './Footer.css';

import { useLocation } from 'react-router-dom';

function Footer() {

  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ||
        location.pathname === "/movies" ||
        location.pathname === "/saved-movies" ?
        (
          <footer className="footer">
            <p className="footer__paragraph">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__wrapper">
              <p className="footer__year">©&nbsp;2023</p>
              <ul className="footer__links-list">
                <li><a className="footer__link-item hover" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
                <li><a className="footer__link-item hover" href="https://github.com/" target="_blank" rel="noreferrer">Github</a></li>
              </ul>
            </div>
          </footer>
        ) : (
          null
        )}
    </>
  );
}

export default Footer;