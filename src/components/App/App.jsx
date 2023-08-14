import './App.css';
import { Routes, Route } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Preloader from '../Preloader/Preloader';

function App() {
  return (
    <div className="root">
      <div className="page">
        <Header />

        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={<Preloader />} />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}

export default App;