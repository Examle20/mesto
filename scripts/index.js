const profile = document.querySelector('.profile');
const popup = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_edit');
const profileEditButton =  profile.querySelector('.profile__button-edit');
const popupCloseButtonEdit = popupEdit.querySelector('.popup__button-close_edit');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const inputName = popupEdit.querySelector('.popup__form-input_field_name');
const inputAbout = popupEdit.querySelector('.popup__form-input_field_about');
const formEdit = popupEdit.querySelector('.popup__form');
const elements = document.querySelector('.elements');
const likeButtons = elements.querySelectorAll('.elements__like');
const popupAdd = document.querySelector('.popup_add');
const profileButtonAdd = profile.querySelector('.profile__button-add');
const popupCloseButtonAdd = popupAdd.querySelector('.popup__button-close_add');
const formAdd = popupAdd.querySelector('.popup__form');
const elementsContainer = elements.querySelector('.elements__list');
const popupImage = document.querySelector('.popup_image');
const fieldTitlePlace = popupAdd.querySelector('.popup__form-input_field_place');
const fieldtitleUrl = popupAdd.querySelector('.popup__form-input_field_url');
const popupImageClose = document.querySelector('.popup__button-close_image');
const popupImageTitle = document.querySelector('.popup__image-title');
const elementsTemplate = document.querySelector('.elements__template').content;


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
//Открыть popup
openPopup = (popup) => {
  popup.classList.add('popup_visible');
}



// Закрыть popup
closePopup = (popup) => {
  popup.classList.remove('popup_visible');
}

//Отрыть popup для редактирования
openPopupEdit = () => {
  inputName.value =  profileTitle.textContent;
  inputAbout.value = profileSubtitle.textContent;
  popupEdit.querySelector('.popup__button-save').classList.remove('popup__button-save_inactive');
  openPopup(popupEdit);
}

//закрыть popup редактирования
closePopupEdit = () => {
  closePopup(popupEdit);
}

// Сохранение отредактированных данных
formSubmitHandler = (event) => {
  event.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputAbout.value;
  closePopupEdit();
};

// Работа с popup для редактирования
profileEditButton.addEventListener('click', openPopupEdit);
popupCloseButtonEdit.addEventListener('click', closePopupEdit);
formEdit.addEventListener('submit', formSubmitHandler);

// Работа с popup для добавления нового места

//Отрыть popup для добавления нового места
openPopupAdd = () => {
  popupAdd.querySelector('.popup__button-save').classList.add('popup__button-save_inactive');
  openPopup(popupAdd);
}

// Закрыть popup добавления нового места
closePopupAdd = () => {
  closePopup(popupAdd);
}

// Создание новой карточки
createCard = (placeTitle, placeUrl) => {
  const elementsItem = elementsTemplate.cloneNode(true);
  const image = elementsItem.querySelector('.elements__image');
  elementsItem.querySelector('.elements__title').textContent = placeTitle;
  image.setAttribute('src', placeUrl);
  image.addEventListener('click', maximiseImage(placeTitle, placeUrl));
  elementsItem.querySelector('.elements__basket').addEventListener('click', removeElement);
  elementsItem.querySelector('.elements__like').addEventListener('click', putLike);
  console.log(elementsItem);
  return elementsItem;
};

// Добавление карточки в контейнер
addNewPlace = (elItem) => {
  elementsContainer.prepend(elItem);
}

// Функция увелечения изображения по нажатию
maximiseImage = (placeTitle, placeUrl) => {
  return () => {
    openPopup(popupImage);
    popupImage.querySelector('.popup__image').setAttribute('src', placeUrl);
    popupImageClose.addEventListener('click', closeMaximiseImage);
    popupImageTitle.textContent = placeTitle;
  }
}

// Закрыть увеличенное изображение
closeMaximiseImage = () => {
  closePopup(popupImage);
}

// Функция удаления элемента
removeElement = (evt) => {
  evt.target.closest('.elements__item').remove();
}

// Кнопка добавления нового места
formSubmitAddHandler = (event) => {
  event.preventDefault();
  addNewPlace(createCard(fieldTitlePlace.value, fieldtitleUrl.value));
  popupAdd.querySelector('.popup__form-input_field_place').value = '';
  popupAdd.querySelector('.popup__form-input_field_url').value = '';
  closePopupAdd();
}

//Поставить like
putLike = (evt) => {
  evt.target.classList.toggle('elements_like_active');
}

// Обработчики кнопок для добавления||удаления нового места
profileButtonAdd.addEventListener('click', openPopupAdd);
popupCloseButtonAdd.addEventListener('click', closePopupAdd);
formAdd.addEventListener('submit', formSubmitAddHandler);

// Функция для загрузки стандартных изображений
uploadImages = () => {
  initialCards.forEach((item) => {
    addNewPlace(createCard(item.name, item.link));
  });
}

// Отслеживание нажатия на Esc
handlePressingEsc = (item) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(item);
    }
  });
}

// ОТслеживание нажатия мыши на overlay
handlePressingMouse = (evt) => {
  if (evt.target.classList.contains('popup')){
    closePopup(evt.target);
  }
}

// Закрыть popup через overlay
closeViaOverlay = () => {
  popup.forEach((item) => {
    item.addEventListener('click', handlePressingMouse);
    handlePressingEsc(item);
  });
}

closeViaOverlay();
uploadImages();

