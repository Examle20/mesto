export class Card {
  constructor({name, link, likes, owner, _id}, cardSelector, handleCardClick, handleBasketClick){
    //const {name, link} = data;
    this._placeTitle = name;
    this._placeUrl = link;
    this.likes = likes;
    this._id = _id;
    this.owner_id = owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleBasketClick = handleBasketClick;
  }

  // Забрать разметку шаблона
  _getTemplate() {
    return document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.elements__item')
    .cloneNode(true);
  }

  returnCardId() {
    return this._id;
  }

  // Удалить карточку
  deleteCard() {
    console.log('hi')
    this._elementsItem.remove();
    this._elementsItem = null;
  }

  // Поставить лайк
  _putLike(evt) {
    evt.target.classList.toggle('elements_like_active');
  }

  // Возвращение данных для создания popupWithImage во время добавления новой карточки
  returnData()  {
    return  {name: this._placeTitle, link: this._placeUrl};
  }

  // Слушатели кнопок на карточке
  _setEventListener() {
    if(this.owner_id === '3bdb0feb685407faf4499a2f')
      this._elementsItem.querySelector('.elements__basket').addEventListener('click', this._handleBasketClick);
    this._elementsItem.querySelector('.elements__like').addEventListener('click', this._putLike);
    this._image.addEventListener('click', this._handleCardClick);
  }

  // Создание карточки
  createCard() {
    this._elementsItem = this._getTemplate();
    if(this.owner_id !== '3bdb0feb685407faf4499a2f')
      this._elementsItem.querySelector('.elements__basket').remove();
    this._image = this._elementsItem.querySelector('.elements__image');
    this._elementsItem.querySelector('.elements__title').textContent = this._placeTitle;
    this._image.setAttribute('src', this._placeUrl);
    this._image.setAttribute('alt', 'Не удалось открыть изображение');
    this._elementsItem.querySelector('.elements__like-count').textContent = this.likes.length;
    this._setEventListener();
    return this._elementsItem;
  }
}
