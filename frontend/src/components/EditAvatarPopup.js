import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormValidation } from '../utils/useFormValidation';

function EditAvatarPopup(props) {
  const { errors, isValid, handleChange, reset, values } = useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: values.linkAvatar
    });
  }

  useEffect(() => {
    reset()
  }, [props.isOpen]);

  const errorClassName = (name) => `popup__error ${errors[name] ? 'popup__error_visible' : ''}`;

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="popup_avatar"
      title="Обновить аватар"
      textButton="Сохранить"
      isValid={isValid}>

      <input
        className="popup__input popup__input_type_avatar"
        type="url"
        placeholder="Ссылка на аватар"
        name='linkAvatar'
        onChange={handleChange}
        required
        value={values.linkAvatar || ''}
      />

      <span className={errorClassName('linkAvatar')} id="inputAvatarName-error">{errors['linkAvatar']}</span>

    </PopupWithForm>
  )
}
export default EditAvatarPopup; 