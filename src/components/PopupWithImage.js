import {Popup} from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector, {title, url}) {
    super(popupSelector);
    this._title = title;
    this._url = url;
  }
  open({name, url}) {
    super.open();
    name.textContent  = this._title;
    url.setAttribute('src', this._url);
    url.setAttribute('alt', 'Что-то с ссылкой на изображение');
  }
  close() {
    super.close();
  }
  setEventListeners(buttonElement) {
    super.setEventListeners(buttonElement);
  }
}
