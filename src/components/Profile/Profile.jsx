import './Profile.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';

function Profile() {

  const [name, setName] = useState('Виталий');
  const [email, setEmail] = useState('pochta@yandex.ru');

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <main className="main">
      <section className="profile section">

        <div className="profile__container">
          <h1 className="profile__title">{`Привет, ${name}!`}</h1>
          <form className="profile__form" name="profile" onSubmit={onSubmit}>

            <fieldset className="profile__input-container">
              <label className="profile__label">Имя
                <input className="profile__input"
                  type="text"
                  name="name"
                  placeholder="Имя"
                  required
                  minLength="2" maxLength="50"
                  id="profile-name"
                  onChange={handleChangeName}
                  value={name}
                />
              </label>

              <label className="profile__label">E-mail
                <input className="profile__input"
                  type="email"
                  name="info"
                  placeholder="E-mail"
                  required
                  minLength="2" maxLength="50"
                  id="profile-email"
                  onChange={handleChangeEmail}
                  value={email}
                />
              </label>
            </fieldset>

            <button className="profile__submit-btn hover" type="submit">Редактировать</button>
          </form>
          <Link to="/" className="profile__close-btn hover">Выйти из аккаунта</Link>
        </div>

      </section>
    </main>
  );
}

export default Profile;