import AuthForm from '../AuthForm/AuthForm';

import { useState } from "react";

function Login({ onAuthorization }) {

  const [email, setEmail] = useState('');
  // Обработчик изменения инпута обновляет стейт
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  const [password, setPassword] = useState('');
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }


  function handleSubmit(e) {
    e.preventDefault();

    onAuthorization({
      email: email,
      password: password,
    });
  }

  return (
    <main className="main">
      <AuthForm
        title={"Рады видеть!"}
        buttonText={"Войти"}
        authText={"Ещё не зарегистрированы?"}
        authLink={"/signup"}
        authTextLink={"Регистрация"}
        email={email}
        password={password}
        onSubmit={handleSubmit}
        handleChangeEmail={handleChangeEmail}
        handleChangePassword={handleChangePassword}
      />
    </main>
  );
}

export default Login;