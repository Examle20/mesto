const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

class Card {
  constructor(data, cardSelector){
    this._placeTitle = data.name;
    this._placeUrl = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .cloneNode(true);
    return cardElement;
  }

  _removeCard(evt) {
    evt.target.closest('.elements__item').remove();
  }

  _putLike(evt) {
    evt.target.classList.toggle('elements_like_active');
  }

  _createCard() {
    this._elementsItem = this._getTemplate();
    this._image = this._elementsItem.querySelector('.elements__image');
    this._elementsItem.querySelector('.elements__title').textContent = this._placeTitle;
    this._image.setAttribute('src', this._placeUrl);
    this._image.setAttribute('alt', 'Не удалось открыть изображение');
    this._elementsItem.querySelector('.elements__basket').addEventListener('click', this._removeCard);
    this._elementsItem.querySelector('.elements__like').addEventListener('click', this._putLike);
    return this._elementsItem;
  }



  addCard() {
    document.querySelector('.elements__list').prepend(this._createCard());
  }
}

const uploadImages = () => {
  initialCards.forEach((item) => {
    const card = new Card(item, '.elements__template');
    card.addCard();
  })
}

uploadImages();
