import './Profile.css';

import { useState } from 'react';

function Profile() {

  const [name, setName] = useState('Виталий');
  const [email, setEmail] = useState('pochta@yandex.ru');

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="profile section">

      <div className="profile__container">
        <h2 className="profile__title">{`Привет, ${name}!`}</h2>
        <form className="profile__form" name="profile" onSubmit={onSubmit}>

          <fieldset className="profile__input-container">
            <label className="profile__label">Имя
              <input className="profile__input"
                type="text"
                name="name"
                placeholder="Имя"
                required
                minLength="2" maxLength="50"
                id="profileName"
                onChange={handleChangeName}
                value={name}
              />
            </label>

            <label className="profile__label">E-mail
              <input className="profile__input profile__input_el_description"
                type="text"
                name="info"
                placeholder="E-mail"
                required
                minLength="2" maxLength="50"
                id="profileDescription"
                onChange={handleChangeEmail}
                value={email}
              />
            </label>
          </fieldset>

          <button className="profile__submit-btn" type="submit">Редактировать</button>  {/*submitText*/}
        </form>
        <button className="profile__close-btn" type="button">Выйти из аккаунта</button>
      </div>

    </div>
  );
}

export default Profile;