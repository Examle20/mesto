import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { validationConfig, initialCards } from '../utils/constans.js';
import { UserInfo } from '../components/UserInfo.js'
import { Section } from '../components/Section';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm';
import {
  elementContainer,
  profileEditButton,
  profileButtonAdd } from '../utils/constans'

// Экземпляр класса для работы с данными профиля
const userInfo = new UserInfo({nameSelector:'.profile__title', aboutSelector:'.profile__subtitle'})

// Экземпляры класса для валидации форм
const editFormValidation = new FormValidator(validationConfig, '.popup_edit');
const addFormValidation = new FormValidator(validationConfig, '.popup_add');

// Popup профиля
const popupEdit = new PopupWithForm('.popup_edit', (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo();
  popupEdit.close();
  editFormValidation.disableButton(); // Добавил, так как при двойном клике на активную кнопку происходит переход на новую страницу с надписью
  //Cannot GET /pages/index.js
});

// Popup для увеличения изображений
const popupWithImage = new PopupWithImage('.popup_image');

// Создание новой карточки
const createCard = (items) => {
  const card = new Card(items, '.elements__template', () => {
    popupWithImage.open(items);
    popupWithImage.setEventListeners();
  })
  return card.createCard();
}

// Popup добавления новых карточек
const popupAdd = new PopupWithForm('.popup_add', (evt) => {
  evt.preventDefault();
  cardList.addItem(createCard(popupAdd.returnData()));
  popupAdd.close();
  addFormValidation.disableButton(); // Добавил, так как при двойном клике на активную кнопку происходит переход на новую страницу с надписью
  // Cannot GET /pages/index.js
});


// Popup редактирования
const openPopupEdit = () => {
  editFormValidation.enableButton();
  editFormValidation.resetValidation();
  userInfo.openUserInfo(userInfo.getUserInfo());
  popupEdit.setEventListeners();// По заданию метод публичный, поэтому здесь и вызываю
  popupEdit.open();
}

// Popup добавления нового места
const openPopupAdd = () => {
  addFormValidation.disableButton();
  addFormValidation.resetValidation();
  popupAdd.open();
  popupAdd.setEventListeners();// По заданию метод публичный, поэтому здесь и вызываю
}

// Отрисовка начальных изображений
const cardList = new Section({items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, elementContainer);

// Слушатели кнопок попав добавления и редактирования
profileEditButton.addEventListener('click', openPopupEdit);
profileButtonAdd.addEventListener('click', openPopupAdd);

// Отрисовка начальных изображений
cardList.renderItems();

// Включение валидации форм
editFormValidation.enableValidation();
addFormValidation.enableValidation();
