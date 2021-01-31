export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._buttonElement = this._popupSelector.querySelector('.popup__button-close');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handlePressingMouse = this._handlePressingMouse.bind(this);
    this.close = this.close.bind(this);
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape'){
      this.close();
    }
  }

  _handlePressingMouse(evt) {
    if (evt.target.classList.contains('popup')){
      this.close();
    }
  }

  open(open) {
    this._popupSelector.classList.add('popup_visible');
  }

  close() {
    this._deleteEventListeners();
    this._popupSelector.classList.remove('popup_visible');
  }

  _deleteEventListeners() {
    this._buttonElement.removeEventListener('click', this.close);
    this._popupSelector.removeEventListener('click', this._handlePressingMouse);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._buttonElement.addEventListener('click', this.close);
    this._popupSelector.addEventListener('click', this._handlePressingMouse);
    document.addEventListener('keydown', this._handleEscClose);
  }
}
