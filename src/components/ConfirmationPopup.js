import {Popup} from "./Popup";

export class ConfirmationPopup extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._buttonDelete = document.querySelector('.popup__button-save_verification');
  }

  _deleteEventListeners() {
    super._deleteEventListeners();
    this._buttonDelete.removeEventListener('click', this._handleButtonConfirmation);
  }

  setEventListeners(handleButtonConfirmation) {
    this._handleButtonConfirmation = handleButtonConfirmation;
    super.setEventListeners();
    this._buttonDelete.addEventListener('click', this._handleButtonConfirmation, {once: true});
  }
}
