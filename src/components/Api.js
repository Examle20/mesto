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

  putLike() {

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
}
