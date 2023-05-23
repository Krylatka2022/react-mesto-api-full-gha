import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile,
    onEditAvatar,
    onAddPlace,
    onCardClick, 
    cards,
    onCardLike,
    onConfirmCardDelete
}) {

    const currentUser = useContext(CurrentUserContext);
      
    return (
        <main>
            <section className="profile">
                <div className="profile__contain">
                    <button className="profile__avatar-button" onClick={onEditAvatar}>
                        <img
                            src={currentUser.avatar}
                            alt="Жак-Ив-Кусто"
                            className="profile__avatar"
                        />
                    </button>
                    <div className="profile__info">
                        <div className="profile__title-button">
                            <h1 className="profile__title" name="profileTitle">{currentUser.name}</h1>
                            <button
                                className="profile__edit-button"
                                type="button"
                                name="profileButton"
                                onClick={onEditProfile}
                            ></button>
                        </div>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    name="profileCardsAddButton"
                    onClick={onAddPlace}
                ></button>
            </section>
            <section className="elements"> {
                cards.map((card) => {
                    return (<Card
                        card={card}
                        key={card._id}
                        name={card.name}
                        link={card.link}
                        likes={card.likes}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onConfirmCardDelete={onConfirmCardDelete}
                    />)
                })
            }
            </section>
        </main>
    );
}

export default Main;