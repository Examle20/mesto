import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { validationConfig, initialCards } from '../utils/constans.js';
import { Popup } from '../components/Popup.js';
import { UserInfo } from '../components/UserInfo.js'
import { Section } from "../components/Section";

import '../styles/index.css';
const elementContainer = document.querySelector('.elements__list');
const profile = document.querySelector('.profile');
const popupEdit = document.querySelector('.popup_edit');
const profileEditButton =  profile.querySelector('.profile__button-edit');
const popupCloseButtonEdit = popupEdit.querySelector('.popup__button-close_edit');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const inputName = popupEdit.querySelector('.popup__form-input_field_name');
const inputAbout = popupEdit.querySelector('.popup__form-input_field_about');
const formEdit = popupEdit.querySelector('.popup__form');
const popupAdd = document.querySelector('.popup_add');
const profileButtonAdd = profile.querySelector('.profile__button-add');
const popupCloseButtonAdd = popupAdd.querySelector('.popup__button-close_add');
const formAdd = popupAdd.querySelector('.popup__form');
const fieldTitlePlace = popupAdd.querySelector('.popup__form-input_field_place');
const fieldtitleUrl = popupAdd.querySelector('.popup__form-input_field_url');
const buttonSavePlace = popupAdd.querySelector('.popup__button-save_place');
const buttonSaveUser = popupEdit.querySelector('.popup__button-save');
const popupImageClose = document.querySelector('.popup__button-close_image');
const popupImage = document.querySelector('.popup_image');
const popusForValidation = document.querySelectorAll('.popup_validation');


// Попап редактирования
const openPopupEdit = () => {
  const userInfo = new UserInfo({nameSelector: profileTitle.textContent, aboutSelector: profileSubtitle.textContent})
  userInfo.getUserInfo({inputName: inputName, inputAbout: inputAbout});
  const popup = new Popup(popupEdit);
  popup.open();
  popup.setEventListeners(popupCloseButtonEdit);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    userInfo.setUserInfo({profileTitle, profileSubtitle, inputName, inputAbout});
    popup.close();
  }

  formEdit.addEventListener('submit', formSubmitHandler);
}

// Попап добавления нового места
const openPopupAdd = () => {
  formAdd.reset();
  const popup = new Popup(popupAdd);
  popup.open();
  popup.setEventListeners(popupCloseButtonAdd);
}

// Отрисовка начальных изображений
const cardList = new Section({items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.elements__template');
    const cardElement = card._createCard();
    cardList.addItem(cardElement);
  }
}, elementContainer);

profileEditButton.addEventListener('click', openPopupEdit);
profileButtonAdd.addEventListener('click', openPopupAdd);

cardList.renderItems();

/*

// Сохранение отредактированных данных
const formSubmitHandler = (event) => {
  event.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputAbout.value;
  closePopup(popupEdit);
};

//Отрыть popup для редактирования
const openPopupEdit = () => {
  //inputName.value =  profileTitle.textContent;
  //inputAbout.value = profileSubtitle.textContent;
  //buttonSaveUser.classList.remove('popup__button-save_inactive');
  //buttonSaveUser.disabled = false;
  //openPopup(popupEdit);
}



const closeIncImage = () => {
  closePopup(popupImage);
}



// Убрать ошибки после закрытия форм
const hideAllErrors = (popup) => {
  const errorList = popup.querySelectorAll('.popup__form-error');
  const inputList = popup.querySelectorAll('.popup__form-input');
  inputList.forEach((item) => {
    item.classList.remove('popup__type-error');
  });
  errorList.forEach((item) => {
    item.classList.remove('popup__form-error_active');
  });
}

// Отслеживание нажатия на Esc
//const handlePressingEsc = (evt) => {
//  if (evt.key === 'Escape') {
//    closePopup(document.querySelector('.popup_visible'));
//  }
//}

// Отслеживание нажатия мыши на overlay
const handlePressingMouse = (evt) => {
  if (evt.target.classList.contains('popup')){
    closePopup(evt.target);
  }
}

// Удалить слушатели события после закрытия popup
const removeListener = (popup) => {
  popup.removeEventListener('click', handlePressingMouse);
  //document.removeEventListener('keydown', handlePressingEsc);
}

// Закрыть popup через overlay
const setListenerOverlay = (popup) => {
  popup.addEventListener('click', handlePressingMouse);
  //document.addEventListener('keydown', handlePressingEsc);
}



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

//закрыть popup редактирования(callback на 192 строке)
const closePopupEdit = () => {
  closePopup(popupEdit);
}

// Кнопка добавления нового места
const formSubmitAddHandler = (event) => {
  event.preventDefault();
  const card = new Card({name: fieldTitlePlace.value, link: fieldtitleUrl.value}, '.elements__template');
  card.addCard();
  formAdd.reset();
  buttonSavePlace.classList.add('popup__button-save_inactive');
  buttonSavePlace.disabled = true;
  closePopupAdd();
}

// Работа с popup для редактирования
profileEditButton.addEventListener('click', openPopupEdit);
popupCloseButtonEdit.addEventListener('click', closePopupEdit);
formEdit.addEventListener('submit', formSubmitHandler);

// Обработчики кнопок для добавления||удаления нового места
profileButtonAdd.addEventListener('click', openPopupAdd);
popupCloseButtonAdd.addEventListener('click', closePopupAdd);
formAdd.addEventListener('submit', formSubmitAddHandler);
// Закрыть увеличенное изображение
popupImageClose.addEventListener('click', closeIncImage);



// Включение валидации форм
const activeValidation = () => {
  popusForValidation.forEach((popupElement) => {
    const formValidator = new FormValidator(validationConfig, popupElement);
    formValidator.enableValidation();
  });
}


activeValidation(); */
