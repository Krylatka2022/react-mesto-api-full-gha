import React, {useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, name, link, likes, onCardClick, onCardLike, onConfirmCardDelete}) {
   
  const currentUser = useContext(CurrentUserContext);
   
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Создаём переменную для условного рендеринга
    const cardDeleteButtonClassName = `element__delete ${
      !isOwn &&  'element__delete_invisible'
    }`;
  
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `element__like ${
      isLiked && 'element__like_active'}`;

    function handleCardClick() {
        onCardClick(card);
    }
    function handleLikeClick() {
        onCardLike(card);
      }
      function handleConfirmClick() {
        onConfirmCardDelete(card);
      }
    return (
        <article className="element">
            <img onClick={handleCardClick} className="element__image" alt={name} src={link} />
            <button
                onClick={handleConfirmClick}
                className={cardDeleteButtonClassName}
                type="button"
            ></button>
            <div className="element__title-button">
                <h2 className="element__title">{name}</h2>
                <div className="element__container-like">
                    <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button"></button>
                    <span className="element__like-counter">{likes.length}</span>
                </div>
            </div>
        </article>
    )
}

export default Card;
