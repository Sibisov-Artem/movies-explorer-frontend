import './PageNotFound.css';

import { Link, useNavigate } from 'react-router-dom';

function PageNotFound() {

  const navigate = useNavigate();

  function goBack() {
    navigate(-4); //(-1, { replace: true });
  }

  return (
    <main className="main">
      <section className="page-not-found">
        <h1 className="page-not-found__title">404</h1>
        <p className="page-not-found__subtitle">Страница не найдена</p>
        <Link onClick={goBack} className="page-not-found__link hover">Назад</Link>
      </section>
    </main>
  );
}

export default PageNotFound;