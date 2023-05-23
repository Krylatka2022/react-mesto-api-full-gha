import { token, cohort } from "./dataAutorization";

class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
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
			headers: this._headers,
		}).then(this._checkResponse);
	}

	changeUserInfo(items) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				name: items.name,
				about: items.about,
			}),
		}).then(this._checkResponse);
	}

	changeUserAvatar(items) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({ avatar: items.avatar, }),
		}).then(this._checkResponse);
	}

	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			headers: this._headers,
		}).then(this._checkResponse);
	}

	addCard(items) {
		return fetch(`${this._baseUrl}/cards`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({
				name: items.name,
				link: items.link,
			}),
		}).then(this._checkResponse);
	}

	deleteCard(id) {
		return fetch(`${this._baseUrl}/cards/${id}`, {
			method: "DELETE",
			headers: this._headers,
		}).then(this._checkResponse);
	}

	addLike(id) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: "PUT",
			headers: this._headers,
		}).then(this._checkResponse);
	}

	deleteLike(id) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: "DELETE",
			headers: this._headers,
		}).then(this._checkResponse);
	}
}
/** Подключить API */
const api = new Api({
	baseUrl: `https://mesto.nomoreparties.co/v1/${cohort}`,
	headers: {
		'Authorization': token,
		'Content-Type': 'application/json'
	}
});

export default api; 