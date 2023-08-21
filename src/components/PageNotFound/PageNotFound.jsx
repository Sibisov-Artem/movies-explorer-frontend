import './PageNotFound.css';

import {Link, useNavigate } from 'react-router-dom';

function PageNotFound() {

  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <div className="page-not-found">
      <h2 className="page-not-found__title">404</h2>
      <p className="page-not-found__subtitle">Страница не найдена</p>
      <Link onClick={goBack} className="page-not-found__link hover">Назад</Link>
    </div>
  );
}

export default PageNotFound;