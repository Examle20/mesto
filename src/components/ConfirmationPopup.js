import {Popup} from "./Popup";

export class ConfirmationPopup extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._buttonDelete = document.querySelector('.popup__button-save_verification');
  }

  open() {
    super.open();
  }

  _deleteEventListeners() {
    super._deleteEventListeners();
    this._buttonDelete.removeEventListener('click', this._handleButtonConfirmation);
  }

  // Решение придумал сам, с наставником не консультировался, так как долго ждать ответа
  // Это я к тому, что если решение плохое, то моя ошибка, а не плохо наставник проконсультировал
  setEventListeners(handleButtonConfirmation) {
    this._handleButtonConfirmation = handleButtonConfirmation;
    super.setEventListeners();
    this._buttonDelete.addEventListener('click', this._handleButtonConfirmation);
  }
}
