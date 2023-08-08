import './AboutProject.css'

function AboutProject() {
  return (
    <section className="about-project section" id="about-project" >
      <h2 className="section__title">О проекте</h2>

      <ul className="about-project__list">
        <li className="about-project__item">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>

        <li className="about-project__item">
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>

      <div className="timeline">
        <div className="timeline__first-column">
          <p className="timeline__item timeline__item_green">1 неделя</p>
          <p className="timeline__item timeline__item_name">Back-end</p>
        </div>
        <div className="timeline__second-column">
          <p className="timeline__item timeline__item_grey">4 недели</p>
          <p className="timeline__item timeline__item_name">Front-end</p>
        </div>
      </div>

    </section>
  );
}

export default AboutProject;