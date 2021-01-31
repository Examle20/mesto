export class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
  }

  getUserInfo({inputName, inputAbout}) {
    inputName.value = this._nameSelector.textContent;
    inputAbout.value = this._aboutSelector.textContent;
  }

  setUserInfo({inputName, inputAbout}) {
    this._nameSelector.textContent = inputName.value;
    this._aboutSelector.textContent = inputAbout.value;
  }
}
