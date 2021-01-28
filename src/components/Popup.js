export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this);
    this._buttonElement = this._popupSelector.querySelector('.popup__button-close');
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape'){
      this.close();
    }
  }

  open() {
    this._popupSelector.classList.add('popup_visible');
  }

  close() {
    this._deleteEventListeners();
    this._popupSelector.classList.remove('popup_visible');
  }

  _deleteEventListeners() {
    this._buttonElement.removeEventListener('click', this.close);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._buttonElement.addEventListener('click', this.close);
    document.addEventListener('keydown', this._handleEscClose);
  }
}
