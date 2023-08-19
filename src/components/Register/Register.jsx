import './Register.css'

import { Link } from 'react-router-dom';

function Register() {

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="register">
      <div className="logo"></div>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={onSubmit}>

        <fieldset className="register__input-container">
          <label className="register__label" for="register-name">Имя</label>
          <input className="register__input"
            type="text"
            name="name"
            placeholder="Имя"
            required
            minLength="2" maxLength="40"
            id="register-name"
            defaultValue="Виталий"
          />
          <span className="register__message-error"></span>

          <label className="register__label" for="register-email">E-mail</label>
          <input className="register__input"
            type="email"
            name="email"
            placeholder="E-mail"
            required
            minLength="2" maxLength="200"
            id="register-email"
            defaultValue="pochta@yandex.ru"
          />
          <span className="register__message-error"></span>

          <label className="register__label" for="register-password">Пароль</label>
          <input className="register__input register__input_error"
            type="password"
            name="password"
            placeholder="Пароль"
            required
            minLength="2" maxLength="200"
            id="register-password"
            defaultValue="11111111111111"
          />
          <span className="register__message-error">Что-то пошло не так...</span>

        </fieldset>

        <button className="register__submit-btn" type="submit">Зарегистрироваться</button>

        <div className="register__login">
          <p className="register__login-text" >Уже зарегистрированы? <Link to="/signin" className="register__login-link">Войти</Link> </p>
        </div>

      </form>

    </div>
  );
}

export default Register;