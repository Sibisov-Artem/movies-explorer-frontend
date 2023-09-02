import './Profile.css';

import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { CurrentUserContext } from '../../context/CurrentUserContext';
import useFormValidation from '../hooks/useFormValidation';

function Profile({ onUpdateUser, onSignOut, errorMessage, successMessage }) {

  const { values, handleChange, errors, isValid, setValues } = useFormValidation();

  const currentUser = useContext(CurrentUserContext);

  const [statusDisabled, setStatusDisabled] = useState(true);

  useEffect(() => {
    setStatusDisabled((currentUser.name === values.name && currentUser.email === values.email) || !isValid);
  }, [values]);

  useEffect(() => {
    setValues(
      {
        name: currentUser.name,
        email: currentUser.email,
      }
    );
  }, [currentUser]);

  function onSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(values);
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
                  onChange={handleChange}
                  defaultValue={values.name}
                  pattern="[а-яёА-ЯЁa-zA-Z\s\-]+"
                  title="Введите имя, используя латиницу, кириллицу, пробел или дефис"
                />
              </label>
              <span className="profile__message-error">{errors.name}</span>

              <label className="profile__label">E-mail
                <input className="profile__input"
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  required
                  minLength="2" maxLength="50"
                  id="profile-email"
                  onChange={handleChange}
                  defaultValue={values.email}
                  pattern="[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]+"
                  title="Введите email"
                />
              </label>
              <span className="profile__message-error">{errors.email}</span>
            </fieldset>

            <p className={`profile__submit-message ${errorMessage && "profile__submit-message_error"}
            ${successMessage && "profile__submit-message_success"}`}>{`${successMessage || errorMessage}`}</p>

            <button className={`profile__submit-btn ${statusDisabled ? "profile__submit-btn_disable" : "hover"}`}
              type="submit"
              disabled={statusDisabled}
            >Редактировать</button>
          </form>
          <Link to="/" className="profile__close-btn hover" onClick={onSignOut}>Выйти из аккаунта</Link>
        </div>

      </section>
    </main >
  );
}

export default Profile;