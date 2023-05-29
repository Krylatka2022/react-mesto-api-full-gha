import React, { useState, useEffect } from 'react';
import '../index.css';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup ';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import UnionBlack from '../images/UnionBlack.svg'
import UnionRed from '../images/UnionRed.svg'

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false)
  const [isEmail, setIsEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [popupStatus, setPopupStatus] = useState({ image: '', message: '' });

  const navigate = useNavigate();

  // Регистрация пользователя
  const handleRegister = (email, password) => {
    // отправляем запрос на сервер для регистрации пользователя
    auth.register(email, password)
      .then((res) => {
        // сохраняем токен и email в localStorage
        localStorage.setItem('token', res.token);
        // localStorage.setItem('email', res.email);
        setPopupStatus({
          image: UnionBlack,
          message: 'Вы успешно зарегистрировались!'
        });
        navigate("/sign-in");
        // обновляем стейт isLoggedIn и setIsEmail
        setIsLoggedIn(true);
        setIsEmail(res.email);
      })
      .catch(() => {
        setPopupStatus({
          image: UnionRed,
          message: 'Что-то пошло не так! Попробуйте еще раз.'
        });
      })
      .finally(handleInfoTooltip);
  };


  // Вход в аккаунт
  const handleLogin = (email, password) => {
    // отправляем запрос на сервер для авторизации пользователя
    auth.authorize(email, password)
      .then((res) => {
        // сохраняем токен и email в localStorage
        localStorage.setItem('token', res.token);
        // localStorage.setItem('email', res.email);
        // обновляем стейт isLoggedIn и currentUser
        setIsLoggedIn(true);
        setIsEmail(res.email);
        navigate("/")
      })
      .catch((err) => {
        setPopupStatus({ image: UnionRed, message: 'Что-то пошло не так! Попробуйте еще раз.' });
        handleInfoTooltip();
      });
  };


  const handleLogOut = () => {
    // очищаем localStorage и обновляем стейт isLoggedIn и setIsEmail
    // localStorage.removeItem('token');
    // localStorage.removeItem('email');
    setIsLoggedIn(false);
    setIsEmail(null);
    navigate("/");
  };

  function handleInfoTooltip() {
    setIsInfoTooltipPopupOpen(true);
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.addLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => {
        console.error(err);
      });
    } else {
      api.deleteLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => {
        console.error(err);
      });
    }
  }


  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id && c));
      closeAllPopups()
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleUpdateUser(items) {
    api
      .changeUserInfo(items)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(items) {
    api.changeUserAvatar(items).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    })
  }

  function handleAddPlaceSubmit(items) {
    api
      .addCard(items)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function closePopupEscape(event) {
    if (event.key === 'Escape') {
      closeAllPopups();
    }
  }

  function closePopupOverlay(event) {
    if (event.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsConfirmationPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  // Получение данных текущего пользователя и начальных карточек
  useEffect(() => {
    const token = localStorage.getItem('userId');
    if (token) {
      // if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([data, items]) => {
        setCurrentUser(data);
        setCards(items.reverse());
      }).catch((err) => {
        console.error(err);
      });
    }
  }, [isLoggedIn]);
  // Проверка токена и авторизация пользователя
  useEffect(() => {
    const token = localStorage.getItem('userId');
    if (token) {
      // отправляем запрос на сервер для проверки токена
      auth.checkToken(token)
        .then((res) => {
          // если токен действителен, обновляем стейт isLoggedIn и currentUser
          // if (res) {
          setIsLoggedIn(true);
          // setIsEmail(res.email); - не мешало вроде
          navigate("/");
          // navigate('/', { replace: true });
          // }
        })
        .catch((err) => {
          //перестала предварительная onauthorized вылезать
          localStorage.removeItem('userId');
          console.log(err);
        });
    }
  },
    [navigate]);
  // [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path='/sign-up'
            element={
              <>
                <Header
                  title='Войти'
                  route='/sign-in'
                />
                <Register
                  onRegister={handleRegister}
                />
              </>
            }
          />
          <Route path='/sign-in'
            element={
              <>
                <Header
                  title='Регистрация'
                  route='/sign-up'
                />
                <Login
                  onLogin={handleLogin}
                />
              </>
            }
          />
          <Route path='/'
            element={
              <>
                <Header
                  title='Выйти'
                  route=''
                  email={isEmail}
                  onClick={handleLogOut}
                />
                <ProtectedRoute
                  path="/"
                  component={Main}
                  isLoggedIn={isLoggedIn}
                  onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                  onEditProfile={() => setIsEditProfilePopupOpen(true)}
                  onAddPlace={() => setIsAddPlacePopupOpen(true)}
                  onCardClick={(card) => setSelectedCard(card)}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onConfirmCardDelete={(card) => setIsConfirmationPopupOpen(card)}
                />
                <Footer />
              </>
            }
          />
          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onCloseEscape={closePopupEscape}
          onCloseOverlay={closePopupOverlay}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onCloseEscape={closePopupEscape}
          onCloseOverlay={closePopupOverlay}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCloseEscape={closePopupEscape}
          onCloseOverlay={closePopupOverlay}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ConfirmationPopup
          card={isConfirmationPopupOpen}
          name="popup_card-delete"
          title="Вы уверены?"
          textButton="Да"
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onCloseEscape={closePopupEscape}
          onCloseOverlay={closePopupOverlay}
        />
        <InfoTooltip
          popupStatus={popupStatus}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          onCloseEscape={closePopupEscape}
          onCloseOverlay={closePopupOverlay}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
