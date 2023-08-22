import './AboutMe.css';

import aboutMeImage from '../../images/about-me.jpg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <section className="about-me section" id="about-me" >

      <h2 className="section__title">Студент</h2>

      <div className="about-me__info">
        <div className="about-me__description">
          <h3 className="about-me__subtitle">Виталий</h3>
          <p className="about-me__subline">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__paragraph">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и&nbsp;дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
            С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
            начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a className="about-me__github hover" href="https://github.com/Sibisov-Artem" target="_blank">Github</a>
        </div>

        <img className="about-me__image" alt="Виталий" src={aboutMeImage}></img>

      </div>

      <Portfolio />

    </section>
  );
}

export default AboutMe;