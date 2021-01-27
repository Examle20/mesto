export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  _handleEscClose(evt) {
    console.log('hi')
    if(evt.key === 'Escape'){
      this.close();
    }
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popupSelector.classList.add('popup_visible');
  }

  close() {
    this._popupSelector.classList.remove('popup_visible')
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  setEventListeners(buttonElement) {
    buttonElement.addEventListener('click', this.close.bind(this));
  }
}
