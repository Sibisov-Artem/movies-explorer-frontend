import './NavTab.css';

function NavTab() {
  return (
    <nav className='nav-tab'>
      <ul className='nav-tab__list'>
        <li><a className="nav-tab__link" href="#about-project">О проекте</a></li> {/* установить потом в AboutProject id="about-project" */}
        <li><a className="nav-tab__link" href="#techs">Технологии</a></li> {/* установить потом в Techs id="techs" */}
        <li><a className="nav-tab__link" href="#about-me">Студент</a></li> {/* установить потом в AboutMe id="about-me" */}
      </ul>
    </nav>
  );
}

export default NavTab;