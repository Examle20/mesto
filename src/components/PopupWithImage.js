import {Popup} from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector);
    const {name, link} = data;
    this._title = name;
    this._url = link;
  }

  open({name, url}) {
    super.open();
    console.log('hi');
    console.log(this._title);
    name.textContent = this._title;
    url.setAttribute('src', this._url);
    url.setAttribute('alt', 'Что-то с ссылкой на изображение');
  }
}

