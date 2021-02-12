export class Api {

  constructor({ baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`,
      {
        headers: {
          authorization: this.headers.authorization,
          'Content-Type': 'application/json',
        }
      }
    )
      .then(res => res.json())
  }

  getUser() {
    return fetch(`${this.baseUrl}/users/me`,
      {
        headers:{
          authorization: this.headers.authorization,
          'Content-Type': 'application/json',
        }
      }
    )
      .then(res => res.json())
  }

  editUserInfo(name, about) {
    return fetch(`${this.baseUrl}/users/me`,{
      method: 'PATCH',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  addCard({name, link}) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
  }

  putLike(_id) {
    return fetch(`${this.baseUrl}/cards/likes/${_id}`, {
      method: 'PUT',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json',
      }
    })
  }

  removeLike(_id) {
    return fetch(`${this.baseUrl}/cards/likes/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json',
      }
    })
  }

  removeCard(_id) {
    return fetch(`${this.baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json',
      },
    })
  }

  changeAvatar({avatar}) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatar,
      })
    })
  }
}


