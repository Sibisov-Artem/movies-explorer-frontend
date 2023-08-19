import './AuthForm.css'

import { Link, useLocation } from 'react-router-dom';

function AuthForm({ title, password, buttonText, authText, authLink, authTextLink }) {

  const location = useLocation();

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="auth-form">
      <div className="logo"></div>
      <h2 className="auth-form__title">{title}</h2>
      <form className="auth-form__form" onSubmit={onSubmit}>

        <fieldset className="auth-form__input-container">
          {location.pathname === "/signup" ?
            (
              <>
                <label className="auth-form__label" for="auth-form-name">Имя</label>
                <input className="auth-form__input"
                  type="text"
                  name="name"
                  placeholder="Имя"
                  required
                  minLength="2" maxLength="40"
                  id="auth-form-name"
                  defaultValue="Виталий"
                />
                <span className="auth-form__message-error"></span>
              </>
            ) : (null)}

          <label className="auth-form__label" for="auth-form-email">E-mail</label>
          <input className="auth-form__input"
            type="email"
            name="email"
            placeholder="E-mail"
            required
            minLength="2" maxLength="200"
            id="auth-form-email"
            defaultValue="pochta@yandex.ru"
          />
          <span className="auth-form__message-error"></span>

          <label className="auth-form__label" for="auth-form-password">Пароль</label>
          <input className="auth-form__input auth-form__input_error"
            type="password"
            name="password"
            placeholder="Пароль"
            required
            minLength="2" maxLength="200"
            id="auth-form-password"
            defaultValue={password}
          />
          {location.pathname === "/signup" ?
            (
              <span className="auth-form__message-error">Что-то пошло не так...</span>
            ) : (null)}

        </fieldset>

        <button className="auth-form__submit-btn" type="submit">{buttonText}</button>

        <div className="auth-form__auth">
          <p className="auth-form__auth-text">{authText} <Link to={authLink} className="auth-form__auth-link">{authTextLink}</Link> </p>
        </div>

      </form>

    </div>
  );
}

export default AuthForm;