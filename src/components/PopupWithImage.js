import {Popup} from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageTitle = document.querySelector('.popup__image-title');
    this._image = document.querySelector('.popup__image');
  }

  open({name, link}) {
    super.open();
    this._imageTitle.textContent = name;
    this._image.setAttribute('src', link);
    this._image.setAttribute('alt', name);
  }
}

