import AuthForm from '../AuthForm/AuthForm';

function Login() {

  return (
    <main className="main">
      <AuthForm
        title={"Рады видеть!"}
        password={""}
        buttonText={"Войти"}
        authText={"Ещё не зарегистрированы?"}
        authLink={"/signup"}
        authTextLink={"Регистрация"}
      />
    </main>
  );
}

export default Login;