import './AuthForm.css'

import { Link, useLocation } from 'react-router-dom';

function AuthForm({ title, buttonText, authText, authLink, authTextLink, name, email, password, onSubmit,
  handleChange, statusDisabled, errorMessageName, errorMessageEmail, errorMessagePassword, statusDisabledForClassName, errorMessage,
  isBlockedForm }) {

  const location = useLocation();

  return (
    <section className="auth-form">
      <Link to="/" className='auth-form__link hover'>
        <div className="logo"></div>
      </Link>
      <h1 className="auth-form__title">{title}</h1>
      <form className="auth-form__form" onSubmit={onSubmit}>

        <fieldset className="auth-form__input-container" disabled={isBlockedForm}>
          {location.pathname === "/signup" ?
            (
              <>
                <label className="auth-form__label" htmlFor="auth-form-name">Имя</label>
                <input className="auth-form__input hover"
                  type="text"
                  name="name"
                  placeholder="Имя"
                  required
                  minLength="2" maxLength="40"
                  id="auth-form-name"
                  defaultValue={name}
                  onChange={handleChange}
                  // поле name содержит только латиницу, кириллицу, пробел или дефис
                  pattern="[а-яёА-ЯЁa-zA-Z\s\-]+"
                  title="Введите имя, используя латиницу, кириллицу, пробел или дефис"
                />
                <span className="auth-form__message-error">{errorMessageName}</span>
              </>
            ) : (null)}

          <label className="auth-form__label" htmlFor="auth-form-email">E-mail</label>
          <input className="auth-form__input hover"
            type="email"
            name="email"
            placeholder="E-mail"
            required
            minLength="2" maxLength="200"
            id="auth-form-email"
            defaultValue={email}
            onChange={handleChange}
            pattern="[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]+"
            title="Введите email"
          />
          <span className="auth-form__message-error">{errorMessageEmail}</span>

          <label className="auth-form__label " htmlFor="auth-form-password">Пароль</label>
          <input className="auth-form__input auth-form__input_error hover"
            type="password"
            name="password"
            placeholder="Пароль"
            required
            minLength="2" maxLength="200"
            id="auth-form-password"
            defaultValue={password}
            onChange={handleChange}
            title="Введите пароль"
          />
          {location.pathname === "/signup" ?
            (
              <span className="auth-form__message-error">{errorMessagePassword}</span>
            ) : (null)}

        </fieldset>

        {errorMessage && (<p className='auth-form__submit-error'>{errorMessage}</p>)}
        <button className={`auth-form__submit-btn  ${statusDisabledForClassName ? "auth-form__submit-btn_disable" : "hover"}`}
          type="submit"
          disabled={statusDisabled || isBlockedForm}
        >{buttonText}</button>

        <div className="auth-form__auth">
          <p className="auth-form__auth-text">{authText} <Link to={authLink} className="auth-form__auth-link hover">{authTextLink}</Link> </p>
        </div>

      </form>

    </section>
  );
}

export default AuthForm;