import { BASE_URL } from "./auth";

class Api {
	constructor(options) {
		this._baseUrl = options.baseUrl;
	}

	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		} else {
			return Promise.reject(`${res.status} ${res.statusText}`);
		}
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			method: "GET",
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(res => this._checkResponse(res));
	}

	changeUserInfo(items) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: "PATCH",
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: items.name,
				about: items.about,
			}),
		}).then(res => this._checkResponse(res));
	}

	changeUserAvatar(items) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: "PATCH",
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ avatar: items.avatar }),
		}).then(res => this._checkResponse(res));
	}

	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'GET',
			credentials: 'include',
			headers: {
			},
		})
			.then(res => this._checkResponse(res));
	}

	addCard({ name, link }) {
		return fetch(`${this._baseUrl}/cards`, {
			method: "POST",
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name, link,
			}),
		})
			.then(res => this._checkResponse(res));
	}

	deleteCard(id) {
		return fetch(`${this._baseUrl}/cards/${id}`, {
			method: "DELETE",
			credentials: 'include',
			headers: {
			}
		}).then(res => this._checkResponse(res));
	}

	addLike(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: "PUT",
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => this._checkResponse(res));
	}

	deleteLike(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: "DELETE",
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => this._checkResponse(res));
	}
}
/** Подключить API */
const api = new Api
	({
		baseUrl: BASE_URL,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

export default api; 