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
const buttonSavePlace = popupAdd.querySelector('.popup__button-save_place');
const buttonSaveUser = popupEdit.querySelector('.popup__button-save');
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
const openPopup = (popup) => {
  popup.classList.add('popup_visible');
  closeViaOverlay(popup);
}

// Закрыть popup
const closePopup = (popup) => {
  hideAllErrors();
  removeListener(popup);
  popup.classList.remove('popup_visible');
}

//Отрыть popup для редактирования
const openPopupEdit = () => {
  inputName.value =  profileTitle.textContent;
  inputAbout.value = profileSubtitle.textContent;
  buttonSaveUser.classList.remove('popup__button-save_inactive');
  buttonSaveUser.disabled = false;
  openPopup(popupEdit);

}

// Убрать ошибки после закрытия форм
const hideAllErrors = () => {
  const errorList = document.querySelectorAll('.popup__form-error');
  const inputList = document.querySelectorAll('.popup__form-input');
  inputList.forEach((item) => {
    item.classList.remove('popup__type-error');
  });
  errorList.forEach((item) => {
    item.classList.remove('popup__form-error_active');
  });
}

// Отслеживание нажатия на Esc
const handlePressingEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_visible'));
  }
}

// Отслеживание нажатия мыши на overlay
const handlePressingMouse = (evt) => {
  if (evt.target.classList.contains('popup')){
    closePopup(evt.target);
  }
}

// Удалить слушатели события после закрытия popup
const removeListener = (popup) => {
  popup.removeEventListener('click', handlePressingMouse);
  document.removeEventListener('keydown', handlePressingEsc);
}

// Закрыть popup через overlay
const closeViaOverlay = (popup) => {
  popup.addEventListener('click', handlePressingMouse);
  document.addEventListener('keydown', handlePressingEsc);
}

// Сохранение отредактированных данных
const formSubmitHandler = (event) => {
  event.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputAbout.value;
  closePopup(popupEdit);
};

// Работа с popup для добавления нового места

//Отрыть popup для добавления нового места
const openPopupAdd = () => {
  formAdd.reset();
  openPopup(popupAdd);
}

// Закрыть popup добавления нового места
const closePopupAdd = () => {
  closePopup(popupAdd);
}

// Создание новой карточки
const createCard = (placeTitle, placeUrl) => {
  const elementsItem = elementsTemplate.cloneNode(true);
  const image = elementsItem.querySelector('.elements__image');
  elementsItem.querySelector('.elements__title').textContent = placeTitle;
  image.setAttribute('src', placeUrl);
  image.setAttribute('alt', 'Что-то с ссылкой на изображение');
  image.addEventListener('click', maximiseImage(placeTitle, placeUrl));
  elementsItem.querySelector('.elements__basket').addEventListener('click', removeElement);
  elementsItem.querySelector('.elements__like').addEventListener('click', putLike);
  console.log(elementsItem);
  return elementsItem;
};

// Добавление карточки в контейнер
const addNewPlace = (elItem) => {
  elementsContainer.prepend(elItem);
}

// Функция увелечения изображения по нажатию
const maximiseImage = (placeTitle, placeUrl) => {
  return () => {
    openPopup(popupImage);
    popupImage.querySelector('.popup__image').setAttribute('src', placeUrl);
    popupImage.setAttribute('alt', 'Что-то с ссылкой на изображение');
    popupImageClose.addEventListener('click', closeMaximiseImage);
    popupImageTitle.textContent = placeTitle;
  }
}

// Закрыть увеличенное изображение
const closeMaximiseImage = () => {
  closePopup(popupImage);
}

//закрыть popup редактирования(callback на 192 строке)
closePopupEdit = () => {
  closePopup(popupEdit);
}

// Функция удаления элемента
const removeElement = (evt) => {
  evt.target.closest('.elements__item').remove();
}

// Кнопка добавления нового места
const formSubmitAddHandler = (event) => {
  event.preventDefault();
  addNewPlace(createCard(fieldTitlePlace.value, fieldtitleUrl.value));
  formAdd.reset();
  buttonSavePlace.classList.add('popup__button-save_inactive');
  buttonSavePlace.disabled = true;
  closePopupAdd();
}

//Поставить like
const putLike = (evt) => {
  evt.target.classList.toggle('elements_like_active');
}

// Работа с popup для редактирования
profileEditButton.addEventListener('click', openPopupEdit);
popupCloseButtonEdit.addEventListener('click', closePopupEdit);
formEdit.addEventListener('submit', formSubmitHandler);

// Обработчики кнопок для добавления||удаления нового места
profileButtonAdd.addEventListener('click', openPopupAdd);
popupCloseButtonAdd.addEventListener('click', closePopupAdd);
formAdd.addEventListener('submit', formSubmitAddHandler);

// Функция для загрузки стандартных изображений
const uploadImages = () => {
  initialCards.forEach((item) => {
    addNewPlace(createCard(item.name, item.link));
  });
}

uploadImages();

