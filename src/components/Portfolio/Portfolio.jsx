import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio">
      <h4 className="portfolio__header">Портфолио</h4>
      <ul className="portfolio__list">
        <li className="portofilo__item">
          <a className="portfolio__link hover" href="#">
            Статичный сайт
            <div className="portfolio__link-arrow"></div>
          </a>
        </li>
        <li className="portofilo__item">
          <a className="portfolio__link hover" href="#">
            Адаптивный сайт
            <div className="portfolio__link-arrow"></div>
          </a>
        </li>
        <li className="portofilo__item">
          <a className="portfolio__link hover" href="#">
            Одностраничное приложение
            <div className="portfolio__link-arrow"></div>
          </a>
        </li>
      </ul>

    </div>
  );
}

export default Portfolio;