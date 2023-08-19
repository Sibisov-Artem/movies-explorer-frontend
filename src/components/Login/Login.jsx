import AuthForm from '../AuthForm/AuthForm';

function Login() {

  return (
    <AuthForm
      title={"Рады видеть!"}
      password={""}
      buttonText={"Войти"}
      authText={"Ещё не зарегистрированы?"}
      authLink={"/signup"}
      authTextLink={"Регистрация"}
    />
  );
}

export default Login;