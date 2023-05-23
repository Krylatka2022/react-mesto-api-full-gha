export const BASE_URL = 'https://auth.nomoreparties.co';

const checkResponse = (response) =>
  response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`);
// function checkResponse(res) {
//   if (res.ok) {
//     return res.json();
//   }
//   return Promise.reject(res.status);
// }

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
   };

export const checkToken = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      // Accept: 'application/json',
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${jwt}`
    },
  }).then(checkResponse);
};
