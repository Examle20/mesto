export class UserInfo {
  constructor( { nameSelector, aboutSelector } ) {
    this._userName = document.querySelector(nameSelector);
    this._userAbout = document.querySelector(aboutSelector);
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

  setUserInfo() {
    this._userName.textContent = this._inputName.value;
    this._userAbout.textContent = this._inputAbout.value;
  }
}
