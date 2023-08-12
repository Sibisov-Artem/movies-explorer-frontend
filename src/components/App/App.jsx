import './App.css';
import { Routes, Route } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="root">
      <div className="page">
        <Header />

        <Routes>
          <Route path='/' element={<Main />} />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}

export default App;