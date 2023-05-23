import React, { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormValidation } from '../utils/useFormValidation';

function EditProfilePopup({ isOpen, onUpdateUser, onClose }) {

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  const { values, errors, isValid, handleChange, setValue, setIsValid } = useFormValidation();

  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.

  useEffect(() => {
    if (currentUser) {
      setValue("userName", currentUser.name);
      setValue("userDescription", currentUser.about);
    }
    if (currentUser.name && currentUser.about) {
      setIsValid(true);
    }
  }, [currentUser, setValue, isOpen]);


  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: values['userName'],
      about: values['userDescription']
    });
  }

  const errorClassName = (name) => `popup__error ${errors[name] ? 'popup__error_visible' : ''}`

  const onClosePopup = () => {
    onClose()
    // reset({ 'userName': currentUser.name, 'userDescription': currentUser.about }, true)
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClosePopup}
      onSubmit={handleSubmit}
      name="popup_profile"
      title="Редактировать&nbsp;профиль"
      textButton="Сохранить"
      isValid={isValid}>

      <input
        className="popup__input popup__input_type_name"
        id="inputName"
        type="text"
        name='userName'
        placeholder="Имя"
        value={values['userName'] ?? ''}
        onChange={handleChange}
        required
        minLength='2'
        maxLength='40'
      />
      <span className={errorClassName('userName')} id="inputName-error">{errors['userName']}</span>
      <input
        className="popup__input popup__input_type_about"
        name='userDescription'
        id="inputAbout"
        type="text"
        placeholder="О себе"
        value={values['userDescription'] ?? ''}
        onChange={handleChange}
        required
        minLength='2'
        maxLength='40'
      />
      <span className={errorClassName('userDescription')} id="inputAbout-error">{errors['userDescription']}</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
