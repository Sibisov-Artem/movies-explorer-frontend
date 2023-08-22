import AuthForm from '../AuthForm/AuthForm';

function Register() {

  return (
    <main className="main">
      <AuthForm
        title={"Добро пожаловать!"}
        password={"11111111111111"}
        buttonText={"Зарегистрироваться"}
        authText={"Уже зарегистрированы?"}
        authLink={"/signin"}
        authTextLink={"Войти"}
      />
    </main>
  );
}

export default Register;