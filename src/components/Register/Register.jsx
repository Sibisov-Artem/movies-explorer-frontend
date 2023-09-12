import AuthForm from '../AuthForm/AuthForm';
import useFormValidation from '../hooks/useFormValidation';

function Register({ onRegistration, errorMessage, isBlockedForm }) {

  const { values, handleChange, errors, isValid } = useFormValidation();

  const statusDisabled = !isValid || isBlockedForm;


  function handleSubmit(e) {
    e.preventDefault();

    onRegistration(values);
  }

  return (
    <main className="main">
      <AuthForm
        title={"Добро пожаловать!"}
        buttonText={"Зарегистрироваться"}
        authText={"Уже зарегистрированы?"}
        authLink={"/signin"}
        authTextLink={"Войти"}
        name={values.name}
        email={values.email}
        password={values.password}
        onSubmit={handleSubmit}
        handleChange={handleChange}
        statusDisabled={statusDisabled}
        errorMessageName={errors.name}
        errorMessageEmail={errors.email}
        errorMessagePassword={errors.password}
        statusDisabledForClassName={statusDisabled}
        errorMessage={errorMessage}
        isBlockedForm={isBlockedForm}
      />
    </main>
  );
}

export default Register;