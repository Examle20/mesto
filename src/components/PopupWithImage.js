import {Popup} from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector);
    const {name, link} = data;
    this._title = name;
    this._url = link;
  }

  open({imageTitle, image}) {
    super.open();
    imageTitle.textContent = this._title;
    image.setAttribute('src', this._url);
    image.setAttribute('alt', 'Что-то с ссылкой на изображение');
  }
}

