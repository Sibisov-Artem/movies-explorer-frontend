import AuthForm from '../AuthForm/AuthForm';

import { useState } from "react";

function Register({ onRegistration }) {

  const [name, setName] = useState('');
  // Обработчик изменения инпута обновляет стейт
  function handleChangeName(e) {
    setName(e.target.value);
  }

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

    onRegistration({
      name: name,
      email: email,
      password: password,
    });
  }

  return (
    <main className="main">
      <AuthForm
        title={"Добро пожаловать!"}
        buttonText={"Зарегистрироваться"}
        authText={"Уже зарегистрированы?"}
        authLink={"/signin"}
        authTextLink={"Войти"}
        name={name}
        email={email}
        password={password}
        onSubmit={handleSubmit}
        handleChangeName={handleChangeName}
        handleChangeEmail={handleChangeEmail}
        handleChangePassword={handleChangePassword}
      />
    </main>
  );
}

export default Register;