import '../styles/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { validationConfig, initialCards } from '../utils/constans.js';
import { UserInfo } from '../components/UserInfo.js'
import { Section } from "../components/Section";
import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";

const elementContainer = document.querySelector('.elements__list');
const profile = document.querySelector('.profile');
const popupEdit = document.querySelector('.popup_edit');
const profileEditButton =  profile.querySelector('.profile__button-edit');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const userInfoSelectors = {nameSelector: profileTitle, aboutSelector: profileSubtitle};
const inputName = popupEdit.querySelector('.popup__form-input_field_name');
const inputAbout = popupEdit.querySelector('.popup__form-input_field_about');
const userInfoInputs = {inputName, inputAbout};
const popupAdd = document.querySelector('.popup_add');
const profileButtonAdd = profile.querySelector('.profile__button-add');
const buttonSavePlace = popupAdd.querySelector('.popup__button-save_place');
const buttonSaveUser = popupEdit.querySelector('.popup__button-save');
const popupImage = document.querySelector('.popup_image');
const image = popupImage.querySelector('.popup__image');
const imageTitle = popupImage.querySelector('.popup__image-title');
const imageData = {imageTitle, image};
const popusForValidation = document.querySelectorAll('.popup_validation');

const userInfo = new UserInfo(userInfoSelectors)

// Попап редактирования
const openPopupEdit = () => {
  buttonSaveUser.classList.remove('popup__button-save_inactive');
  buttonSaveUser.disabled = false;
  userInfo.getUserInfo(userInfoInputs);
  const popup = new PopupWithForm(popupEdit, (evt) => {
    evt.preventDefault();
    userInfo.setUserInfo(userInfoInputs );
    popup.close();
  });
  popup.setEventListeners();
  popup.open();
}

// Попап добавления нового места
const openPopupAdd = () => {
  buttonSavePlace.disabled = true;
  const popup = new PopupWithForm(popupAdd, (evt) => {
    evt.preventDefault();
    const card = new Card(popup.returnData(), '.elements__template', () => {
      const popupWithImage = new PopupWithImage(popupImage, card.returnData());
      popupWithImage.open(imageData);
      popupWithImage.setEventListeners();
    })
    const cardElement = card._createCard();
    cardList.addItem(cardElement);
    popup.close();
  });
  popup.open();
  popup.setEventListeners();
}

// Отрисовка начальных изображений
const cardList = new Section({items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.elements__template', () =>{
      const popupWithImage = new PopupWithImage(popupImage, {name: item.name, link: item.link});
      popupWithImage.open(imageData);
      popupWithImage.setEventListeners();
    });
    const cardElement = card._createCard();
    cardList.addItem(cardElement);
  }
}, elementContainer);

// Включение валидации инпутов
const activeValidation = () => {
  popusForValidation.forEach((popupElement) => {
    const formValidator = new FormValidator(validationConfig, popupElement);
    formValidator.enableValidation();
  });
}

// Слушатели кнопок попав добавления и редактирования
profileEditButton.addEventListener('click', openPopupEdit);
profileButtonAdd.addEventListener('click', openPopupAdd);

cardList.renderItems();
activeValidation();
/*

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
}*/
