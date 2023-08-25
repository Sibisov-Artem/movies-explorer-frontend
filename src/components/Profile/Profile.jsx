import './Profile.css';

import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { CurrentUserContext } from '../../context/CurrentUserContext';

function Profile({ onUpdateUser, onSignOut }) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({ name, email });
  }
  //===============================================================================
  return (
    <main className="main">
      <section className="profile section">

        <div className="profile__container">
          <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
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
                  name="email"
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
          <Link to="/" className="profile__close-btn hover" onClick={onSignOut}>Выйти из аккаунта</Link>
        </div>

      </section>
    </main>
  );
}

export default Profile;