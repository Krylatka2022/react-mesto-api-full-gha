import {useState} from 'react';

export default function Login({onLogin}) {
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
   onLogin(email, password);
  };

  return (
    <section className='login'>
      <h3 className='register__title'>Вход</h3>
      <form className='register__form' onSubmit={handleSubmit}>
        <input className='register__input' type='email' placeholder='Email' value={email} onChange={handleEmailInput} required></input>
        <span className="popup__error"></span>
        <input className='register__input' type='password' placeholder='Пароль' value={password} onChange={handlePasswordInput} required></input>
        <span className="popup__error"></span>
        <button className='register__submit-button' type='submit'>Войти</button>
      </form>
    </section>
  );
};