import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {

  }
  close(formSelector) {
    super.close();
    this._popupSelector.querySelector('.popup__form').reset();
    formSelector.removeEventListener('submit', this._handleFormSubmit);
  }

  setEventListeners(buttonElement, formSelector) {
    super.setEventListeners(buttonElement);
    formSelector.addEventListener('submit', this._handleFormSubmit);
  }

}
