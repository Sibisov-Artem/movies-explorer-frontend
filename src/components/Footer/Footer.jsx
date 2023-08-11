import './Footer.css'

function Footer() {
  return (
    <footer className="footer section">
      <p className="footer__paragraph">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__wrapper">
        <p className="footer__year">©&nbsp;2023</p>
        <ul className="footer__links-list">
          <li><a className="footer__link-item" href="#">Яндекс.Практикум</a></li>
          <li><a className="footer__link-item" href="#">Github</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;