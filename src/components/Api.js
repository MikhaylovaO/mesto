export default class Api {
    constructor({url, headers}) {
        this._url = url;
        this._headers = headers
    }

    _checkResponse(res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      }

      getInitialCards() {
        return fetch(`${this._url}/cards`, {
          method: "GET",
          headers: this._headers,
        })
          .then(this._checkResponse)
          .catch(err => this._errorHandler(err));
      }

      getUserInfo() {
        return fetch(`${this._url}/users/me`, {
          method: "GET",
          headers: this._headers,
        })
          .then(this._checkResponse)
          .catch(err => this._errorHandler(err));
      }

      editProfile(name, about) {
        return fetch(`${this._url}/users/me`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            name: name,
            about: about
          })
        })
          .then(this._checkResponse)
          .catch(err => this._errorHandler(err));
      }

      editAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            avatar: avatar
          })
        })
          .then(this._checkResponse)
          .catch(err => this._errorHandler(err));
      }

      postNewCard(name, link) {
        return fetch(`${this._url}/cards`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
            name: name,
            link: link
          })
        })
          .then(this._checkResponse)
          .catch(err => this._errorHandler(err));
      }

      likeCard(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
          method: "PUT",
          headers: this._headers,
        })
          .then(this._checkResponse)
          .catch(err => this._errorHandler(err));
      }

      removeLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
          method: "DELETE",
          headers: this._headers,
        })
          .then(this._checkResponse)
          .catch(err => this._errorHandler(err));
      }

      deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
          method: "DELETE",
          headers: this._headers,
        })
          .then(this._checkResponse)
          .catch(err => this._errorHandler(err));
      }

      _errorHandler(err) {
        console.log(err);
      }
}

