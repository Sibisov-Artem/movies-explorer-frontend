import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio">
      <h4 className="portfolio__header">Портфолио</h4>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a className="portfolio__link hover" href="https://github.com/Sibisov-Artem/how-to-learn" target="_blank">
            Статичный сайт
            <div className="portfolio__link-arrow"></div>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link hover" href="https://github.com/Sibisov-Artem/russian-travel" target="_blank">
            Адаптивный сайт
            <div className="portfolio__link-arrow"></div>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link hover" href="https://github.com/Sibisov-Artem/react-mesto-auth" target="_blank">
            Одностраничное приложение
            <div className="portfolio__link-arrow"></div>
          </a>
        </li>
      </ul>

    </div>
  );
}

export default Portfolio;