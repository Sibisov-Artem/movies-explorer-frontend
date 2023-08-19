import './Register.css'

import AuthForm from '../AuthForm/AuthForm';

function Register() {

  return (
    <AuthForm
      title={"Добро пожаловать!"}
      password={"11111111111111"}
      buttonText={"Зарегистрироваться"}
      authText={"Уже зарегистрированы?"}
      authLink={"/signin"}
      authTextLink={"Войти"}
    />
  );
}

export default Register;