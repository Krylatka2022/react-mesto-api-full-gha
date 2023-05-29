import { BASE_URL } from "./auth";

class Api {
	constructor(options) {
		this._baseUrl = options.baseUrl;
		// this._headers = options.headers;
		// this._baseUrl = "https://api-krylatka.nomoredomains.rocks";
		// this._baseUrl = BASE_URL;
		// this._baseUrl = 'http://localhost:3000';
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
		// const token = localStorage.getItem('jwt');
		return fetch(`${this._baseUrl}/users/me`, {
			method: "GET",
			credentials: 'include',
			headers: {
				// autorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		}).then(res => this._checkResponse(res));
	}

	changeUserInfo(items) {
		// const token = localStorage.getItem('jwt');
		return fetch(`${this._baseUrl}/users/me`, {
			method: "PATCH",
			credentials: 'include',
			headers: {
				// autorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: items.name,
				about: items.about,
			}),
		}).then(res => this._checkResponse(res));
	}

	changeUserAvatar(items) {
		// const token = localStorage.getItem('jwt');
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: "PATCH",
			credentials: 'include',
			headers: {
				// autorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ avatar: items.avatar }),
		}).then(res => this._checkResponse(res));
	}

	getInitialCards() {
		// const token = localStorage.getItem('jwt');
		return fetch(`${this._baseUrl}/cards`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				// autorization: `Bearer ${token}`,
			},
		})
			.then(res => this._checkResponse(res));
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
		})
			.then(res => this._checkResponse(res));
	}

	deleteCard(id) {
		// const token = localStorage.getItem('jwt');
		return fetch(`${this._baseUrl}/cards/${id}`, {
			method: "DELETE",
			credentials: 'include',
			headers: {
				// autorization: `Bearer ${token}`,
			}
		}).then(res => this._checkResponse(res));
	}

	addLike(cardId) {
		// const token = localStorage.getItem('jwt');
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: "PUT",
			credentials: 'include',
			headers: {
				// autorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		}).then(res => this._checkResponse(res));
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
		}).then(res => this._checkResponse(res));
	}
}
/** Подключить API */
const api = new Api
	// ('https://api-krylatka.nomoredomains.rocks');

	({
		baseUrl: BASE_URL,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		// baseUrl: 'http://localhost:3000',
	});

export default api; 