import React, { useEffect } from 'react';
import { useFormValidation } from '../utils/useFormValidation';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const { values, errors, isValid, handleChange, reset } = useFormValidation();

  useEffect(() => {
    reset()
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: values.nameCard,
      link: values.urlCard,
    });
  }

  const errorClassName = (name) => `popup__error ${errors[name] ? 'popup__error_visible' : ''}`

  return (
    <PopupWithForm
      name="popup_cards"
      title="Новое место"
      textButton="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        className="popup__input popup__input_type_name-card"
        id="inputNameCard"
        name='nameCard'
        type="text"
        placeholder="Название"
        required
        onChange={handleChange}
        value={values.nameCard || ''}
        minLength='2'
        maxLength='40'
      />

      <span className={errorClassName('nameCard')} id="inputNameCard-error">{errors['nameCard']}</span>
      <input
        className="popup__input popup__input_type_url-card"
        id="inputUrlCard"
        name='urlCard'
        type="url"
        placeholder="Ссылка на картинку"
        pattern="https://.*"
        required
        onChange={handleChange}
        value={values.urlCard || ''}
        minLength='2'
      />
      <span className={errorClassName('urlCard')} id="inputUrlCard-error">{errors['urlCard']}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

