export class Api {

  constructor( {baseUrl, headers}) {
    const {authorization, contentType} = headers;
    this._baseUrl = baseUrl;
    this._authorization = authorization;
    this._contentType = contentType;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`,
      {
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType,
        }
      }
    )
      .then(res => {
        if (res.status) return res.json();
      })
      .catch(err => {
        console.log(err);
      })
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`,
      {
        headers:{
          authorization: this._authorization,
          'Content-Type': this._contentType,
        }
      }
    )
      .then(res => {
        if (res.status) return res.json();
      })
      .catch(err => {
        console.log(err);
      })
  }

  editUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`,{
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType,
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        if (res.status) return res.json();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  addCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType,
      },
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
      .then(res => {
        if (res.status) return res.json();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  putLike(_id) {
    return fetch(`${this._baseUrl}/cards/likes/${_id}`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType,
      }
    })
      .then(res => {
        if (res.status) return res.json();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  removeLike(_id) {
    return fetch(`${this._baseUrl}/cards/likes/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType,
      }
    })
      .then(res => {
        if (res.status) return res.json();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  removeCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType,
      },
    })
      .then(res => {
        if (res.status) return res;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  changeAvatar({avatar}) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType,
      },
      body: JSON.stringify({
        avatar: avatar,
      })
    })
      .then(res => {
        if (res.ok) return res.json();
      })
      .catch((err) => {
        console.log(err);
      })
  }
}


