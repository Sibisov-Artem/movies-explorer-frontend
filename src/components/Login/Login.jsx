import AuthForm from '../AuthForm/AuthForm';
import useFormValidation from '../hooks/useFormValidation';

function Login({ onAuthorization, errorMessage }) {

  const { values, handleChange, errors, isValid } = useFormValidation();

  const statusDisabled = !isValid;


  function handleSubmit(e) {
    e.preventDefault();

    onAuthorization(values);
  }

  return (
    <main className="main">
      <AuthForm
        title={"Рады видеть!"}
        buttonText={"Войти"}
        authText={"Ещё не зарегистрированы?"}
        authLink={"/signup"}
        authTextLink={"Регистрация"}
        email={values.email}
        password={values.password}
        onSubmit={handleSubmit}
        handleChange={handleChange}
        statusDisabled={statusDisabled}
        errorMessageEmail={errors.email}
        errorMessagePassword={errors.password}
        statusDisabledForClassName={statusDisabled}
        errorMessage={errorMessage}
      />
    </main>
  );
}

export default Login;