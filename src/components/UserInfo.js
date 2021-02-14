export class UserInfo {
  constructor( { nameSelector, aboutSelector, avatarSelector } ) {
    this._userName = document.querySelector(nameSelector);
    this._userAbout = document.querySelector(aboutSelector);
    this._userAvatar = document.querySelector(avatarSelector);
    this._inputName = document.querySelector('.popup__form-input_field_name');
    this._inputAbout = document.querySelector('.popup__form-input_field_about');
  }

  getUserInfo() {
    const userData = {};
    userData.name = this._userName.textContent;
    userData.about = this._userAbout.textContent;
    return userData;
  }

  openUserInfo({name, about}) {
    this._inputName.value = name;
    this._inputAbout.value = about;
  }

  getUserId(_id) {
    this._userId = _id;
  }

  returnUserId() {
    return this._userId;
  }

  setUserInfo({name, about, avatar}) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._userAvatar.setAttribute('src', avatar)
  }
}
