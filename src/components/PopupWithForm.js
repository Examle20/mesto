import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formSelector = popupSelector.querySelector('.popup__form');

  }

  _getInputValues() {
    const inputValues = {};
    this._formSelector.querySelectorAll('.popup__form-input').forEach((item) =>{
      inputValues[item.name] = item.value;
    });
    return inputValues;
  }

  close() {
    super.close();
    this._formSelector.reset();
    this._formSelector.removeEventListener('submit', this._handleFormSubmit);
    //formSelector.removeEventListener('submit', this._handleFormSubmit);
  }
  

  setEventListeners() {
    super.setEventListeners();
    this._formSelector.addEventListener('submit', this._handleFormSubmit);
  }

}
