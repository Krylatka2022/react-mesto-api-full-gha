import { BASE_URL } from "./auth";

class Api {
	constructor() {
		// this._baseUrl = 'https://api-krylatka.nomoredomains.rocks';
		this._baseUrl = 'http://localhost:3000';
		// this._headers = headers;
		// this._token = localStorage.getItem('jwt');
	}

	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		} else {
			return Promise.reject(`${res.status} ${res.statusText}`);
		}
	}

	// _headersStorage = () => {
	// 	this._token = localStorage.getItem('jwt');
	// 	this._headers.authorization = `Bearer ${this._token}`
	// 	return this._headers;
	// }

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			method: "GET",
			credentials: 'include',
		}).then(this._checkResponse);
	}

	changeUserInfo(items) {
		// const token = localStorage.getItem('jwt');
		return fetch(`${this._baseUrl}/users/me`, {
			method: "PATCH",
			credentials: 'include',
			// headers: {
			// 	autorization: `Bearer ${token}`,
			// }, 
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: items.name,
				about: items.about,
			}),
		}).then(this._checkResponse);
	}

	changeUserAvatar(items) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: "PATCH",
			credentials: 'include',
			// headers: this._headers,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ avatar: items.avatar }),
		}).then(this._checkResponse);
	}

	getInitialCards() {
		// const token = localStorage.getItem('jwt');
		return fetch(`${this._baseUrl}/cards`, {
			credentials: 'include',
			// {
			// headers: {
			// 	autorization: `Bearer ${token}`,
			// }
		})
			.then(this._checkResponse);
	}

	addCard({ name, link }) {
		// const token = localStorage.getItem('jwt');
		return fetch(`${this._baseUrl}/cards`, {
			method: "POST",
			credentials: 'include',
			headers: {
				// autorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				// name: items.name,
				// link: items.link,
				name, link,
			}),
		}).then(this._checkResponse);
	}

	deleteCard(id) {
		// const token = localStorage.getItem('jwt');
		return fetch(`${this._baseUrl}/cards/${id}`, {
			method: "DELETE",
			credentials: 'include',
			// headers: {
			// 	autorization: `Bearer ${token}`,
			// }
		}).then(this._checkResponse);
	}

	addLike(cardId) {
		// const token = localStorage.getItem('jwt');
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: "PUT",
			credentials: 'include',
			// headers: {
			// 	autorization: `Bearer ${token}`,
			// }
		}).then(this._checkResponse);
	}

	deleteLike(cardId) {
		// const token = localStorage.getItem('jwt');
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: "DELETE",
			credentials: 'include',
			headers: {
				// autorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		}).then(this._checkResponse);
	}
}
/** Подключить API */
const api = new Api({
	baseUrl: BASE_URL,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
});

export default api; 