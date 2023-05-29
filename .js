// export const BASE_URL = "https://api-krylatka.nomoredomains.rocks";
// const checkResponse = (response) =>
//     response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`);
// export const register = (email, password) => {
//     return fetch(`${BASE_URL}/signup`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//     }).then(checkResponse);
// };
// export const authorize = (email, password) => {
//     return fetch(`${BASE_URL}/signin`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//     })
//         .then(checkResponse)
//     };
// export const checkToken = (token) => {
//     return fetch(`${BASE_URL}/users/me`, {
//         method: 'GET',
//         credentials: 'include',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             "Authorization": `Bearer ${token}`
//         },
//     }).then(checkResponse);
// };
// //api front
// import { BASE_URL } from "./auth";
// class Api {
//     constructor() {
//           this._baseUrl = "https://api-krylatka.nomoredomains.rocks";
//         // this._baseUrl = 'http://localhost:3000';
//         }
//     _checkResponse(res) {
//         if (res.ok) {
//             return res.json();
//         } else {
//             return Promise.reject(`${res.status} ${res.statusText}`);
//         }
//     }
//     getUserInfo() {
//         return fetch(`${this._baseUrl}/users/me`, {
//             method: "GET",
//             credentials: 'include',
//         }).then(this._checkResponse);
//     }

// //app
// require('dotenv').config();
// const cors = require('cors');
// const app = express();

// app.use(cors({ origin: ['http://localhost:3001', 'http://localhost:3000', 'https://api-krylatka.nomoredomains.rocks', 'http://api-krylatka.nomoredomains.rocks', 'https://krylatka.nomoredomains.rocks', 'http://krylatka.nomoredomains.rocks', '*'], credentials: true }));

// //auth-middle
// const jwt = require('jsonwebtoken');
// const AuthError = require('../errors/auth-error');

// const { NODE_ENV, JWT_SECRET } = process.env;

// const handleUnauthorized = (req, res, next) => next(new AuthError('Необходима авторизация'));
// const auth = (req, res, next) => {
//     const token = req.cookies.jwt;
  
//     let payload;
//     try {
//         payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
//     } catch (err) {
//         return handleUnauthorized(req, res, next);
//     }
//     req.user = payload;
//     return next();
// };
// module.exports = auth;

// При таком запросе на https://api-krylatka.nomoredomains.rocks все время ошибка авторизации
// signin {"_id":"","name":"","about":"","avatar":"","email":"","__v":0}
// а должен приходить token. Как исправить?



// // app
// // Проверка токена и авторизация пользователя
// useEffect(() => {
//     const token = localStorage.getItem('jwt');
//     if (token) {
//         // отправляем запрос на сервер для проверки токена
//         auth.checkToken(token)
//             .then((res) => {
//                 // если токен действителен, обновляем стейт isLoggedIn и currentUser
//                 if (res) {
//                     setIsLoggedIn(true);
//                     setIsEmail(res.email);
//                     // navigate("/");
//                     navigate('/', { replace: true });
//                 }
//             })
//             .catch((err) => console.log(err));
//     }
// },
//     [navigate]);

//     //auth
// export const checkToken = () => {
//     const token = localStorage.getItem('jwt');
//     return fetch(`${BASE_URL}/users/me`, {
//         method: 'GET',
//         credentials: 'include',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             "Authorization": `Bearer ${token}`
//         },
//     }).then(checkResponse);
// };

// TypeError: Failed to fetch
//     at Module.checkToken(auth.js: 47: 1)
//     at App.jsx: 194: 1
//     at commitHookEffectListMount(react - dom.development.js: 23150: 1)
//     at commitPassiveMountOnFiber(react - dom.development.js: 24926: 1)
//     at commitPassiveMountEffects_complete(react - dom.development.js: 24891: 1)
//     at commitPassiveMountEffects_begin(react - dom.development.js: 24878: 1)
//     at commitPassiveMountEffects(react - dom.development.js: 24866: 1)
//     at flushPassiveEffectsImpl(react - dom.development.js: 27039: 1)
//     at flushPassiveEffects(react - dom.development.js: 26984: 1)
//     at react - dom.development.js: 26769: 1

//     где тут исправить?
