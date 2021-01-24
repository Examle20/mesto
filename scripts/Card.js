import { openPopup, closePopup } from './index.js';

const popupImage = document.querySelector('.popup_image');
const image = popupImage.querySelector('.popup__image');
const imageTitle = popupImage.querySelector('.popup__image-title');

export class Card {
  constructor(data, cardSelector){
    const {name, link} = data;
    this._placeTitle = name;
    this._placeUrl = link;
    this._cardSelector = cardSelector;
  }

  // Забрать разметку шаблона
  _getTemplate() {
    return document
    .querySelector(this._cardSelector)
    .content
    .cloneNode(true);
  }

  // Удалить карточку
  _removeCard() {
    this._image.closest('.elements__item').remove();
    this._elementsItem = null;
  }

  // Поставить лайк
  _putLike(evt) {
    evt.target.classList.toggle('elements_like_active');
  }

  // Увеличить изображение по нажатию
  _incImage(title, url) {
    return () => {
      openPopup(popupImage);
      image.setAttribute('src', url);
      image.setAttribute('alt', 'Что-то с ссылкой на изображение');
      imageTitle.textContent = title;
    }
  }

  // Слушатели кнопок на карточке
  _setEventListener() {
    this._elementsItem.querySelector('.elements__basket').addEventListener('click', () => this._removeCard());
    this._elementsItem.querySelector('.elements__like').addEventListener('click', this._putLike);
    this._image.addEventListener('click', this._incImage(this._placeTitle, this._placeUrl));
  }

  // Создание карточки
  _createCard() {
    this._elementsItem = this._getTemplate();
    this._image = this._elementsItem.querySelector('.elements__image');
    this._elementsItem.querySelector('.elements__title').textContent = this._placeTitle;
    this._image.setAttribute('src', this._placeUrl);
    this._image.setAttribute('alt', 'Не удалось открыть изображение');
    this._setEventListener();
    return this._elementsItem;
  }

  // Добавление карточки в разметку
  addCard() {
    document.querySelector('.elements__list').prepend(this._createCard());
  }
}
