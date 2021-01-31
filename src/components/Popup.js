export class Popup {

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonElement = this._popup.querySelector('.popup__button-close');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handlePressingMouse = this._handlePressingMouse.bind(this);
    this.close = this.close.bind(this);
  }

  // Закрыть через Esc
  _handleEscClose(evt) {
    if(evt.key === 'Escape'){
      this.close();
    }
  }

  // Закрыть через оверлей
  _handlePressingMouse(evt) {
    if (evt.target.classList.contains('popup')){
      this.close();
    }
  }

  // Открыть popup
  open(open) {
    this._popup.classList.add('popup_visible');
  }

  // Закрыть popup и удалить слушатели
  close() {
    this._deleteEventListeners();
    this._popup.classList.remove('popup_visible');
  }

  // Удаление слушателей
  _deleteEventListeners() {
    this._buttonElement.removeEventListener('click', this.close);
    this._popup.removeEventListener('click', this._handlePressingMouse);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Добавить слушатели
  setEventListeners() {
    this._buttonElement.addEventListener('click', this.close);
    this._popup.addEventListener('click', this._handlePressingMouse);
    document.addEventListener('keydown', this._handleEscClose);
  }
}
