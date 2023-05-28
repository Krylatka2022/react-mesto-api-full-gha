// export const BASE_URL = 'https://api-krylatka.nomoredomains.rocks';
export const BASE_URL = 'http://localhost:3000';
// export const BASE_URL = 'https://api-krylatka.nomoredomains.rocks';


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
      'Accept': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
  // .then((data) => {
  //   localStorage.setItem('userId', data._id)
  //   return data;
  // }
  // )
};

export const checkToken = (token) => {
  // const token = localStorage.getItem('jwt');
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
  }).then(checkResponse);
};
