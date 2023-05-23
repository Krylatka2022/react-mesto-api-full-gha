import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register({ onRegister }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handlePasswordInput = event => {
    setPassword(event.target.value);
  };

  const handleEmailInput = event => {
    setEmail(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onRegister(email, password);
  };

  return (
    <section className='register'>
      <h3 className='register__title'>Регистрация</h3>
      <form className='register__form' onSubmit={handleSubmit}>
        <input className='register register__input' type='email' placeholder='Email' value={email} onChange={handleEmailInput} required></input>
        <span className="popup__error"></span>
        <input className='register__input' type='password' placeholder='Пароль' value={password} onChange={handlePasswordInput} required></input>
        <span className="popup__error"></span>
        <button className='register__submit-button' type='submit'>Зарегистрироваться</button>
      </form>
      <div className="register__contain">
        <p className='register__text'>Уже зарегистрированы?&nbsp;</p>
        <Link to="/sign-in" className='register__link'>Войти</Link>
      </div>
    </section>
  );
};
