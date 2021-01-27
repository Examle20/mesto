export class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
  }

  getUserInfo({inputName, inputAbout}) {
    inputName.value = this._nameSelector;
    inputAbout.value = this._aboutSelector;
  }

  setUserInfo({profileTitle, profileSubtitle, inputName, inputAbout}) {
    profileTitle.textContent = inputName.value;
    profileSubtitle.textContent = inputAbout.value;
  }
}
