export class UserInfo {
  constructor(userInfoSelectors) {
    const {nameSelector, aboutSelector} = userInfoSelectors;
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
