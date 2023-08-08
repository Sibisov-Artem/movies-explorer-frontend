import './Main.css';

import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';

function Main() {
  return (
    <main className="main">
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
    </main>
  );
}

export default Main;