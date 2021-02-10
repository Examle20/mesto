import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { validationConfig} from '../utils/constans.js';
import { UserInfo } from '../components/UserInfo.js'
import { Section } from '../components/Section';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm';
import { Api } from "../components/Api";
import {
  elementContainer,
  profileEditButton,
  profileButtonAdd } from '../utils/constans'
import {Popup} from "../components/Popup";
//3bdb0feb685407faf4499a2f
// Работа с запросами
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: '1ab383b2-76d9-452f-83da-c9ac4a4eb776',
    'Content-Type': 'application/json'
  }
});

api.getUser()
  .then((res) => {
    document.querySelector('.profile__title').textContent = res.name;
    document.querySelector('.profile__subtitle').textContent = res.about;
    document.querySelector('.profile__photo').setAttribute('src', res.avatar)
  })


// Экземпляр класса для работы с данными профиля
const userInfo = new UserInfo({nameSelector:'.profile__title', aboutSelector:'.profile__subtitle'})

// Экземпляры класса для валидации форм
const editFormValidation = new FormValidator(validationConfig, '.popup_edit');
const addFormValidation = new FormValidator(validationConfig, '.popup_add');

const popupDelete = new Popup('.popup_delete')


// Popup профиля
const popupEdit = new PopupWithForm('.popup_edit', (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo();
  api.editUserInfo(document.querySelector('.popup__form-input_field_name').value, document.querySelector('.popup__form-input_field_about').value)
    .then(res => console.log(res))
  popupEdit.close();
  editFormValidation.disableButton(); // Добавил, так как при двойном клике на активную кнопку происходит переход на новую страницу с надписью
  //Cannot GET /pages/index.js
});

// Popup для увеличения изображений
const popupWithImage = new PopupWithImage('.popup_image');

const removeCard = (_id, card) => {
  return () => {
    api.removeCard(_id)
      .then((res) => {
        if(res.status) card.deleteCard();
        popupDelete.close();
      })
  }
}

// Создание новой карточки
const createCard = (items) => {
  const card = new Card(items, '.elements__template', () => {
    popupWithImage.open(items);
    popupWithImage.setEventListeners();
  }, ()=> {
    popupDelete.setEventListeners();
    document.querySelector('.popup__button-save_verification').addEventListener('click', removeCard(card.returnCardId(), card))
    popupDelete.open();
  }, ()=> {
    api.putLike(card.returnCardId())
      .then(res => res.json())
      .then((res) => {
        console.log(res.likes.length)
        card.showLikesCounter(res.likes.length)
      })
  }, () => {
    api.removeLike(card.returnCardId())
      .then(res => res.json())
      .then((res) => {
        console.log(res.likes.length)
        card.showLikesCounter(res.likes.length)
      })
  })
  return card.createCard();
}

const card = new Section({items: '',
  renderer: () => {}
}, elementContainer);


// Popup добавления новых карточек
const popupAdd = new PopupWithForm('.popup_add', (evt) => {
  evt.preventDefault();
  const cardInfo = popupAdd.returnData();
  api.addCard(popupAdd.returnData())
    .then((res) => {
      if (res.status){
        card.addItem(createCard(cardInfo));
      }
    })
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
api.getInitialCards()
  .then((res) => {
    const cardList = new Section({items: res,
      renderer: (item) => {
        cardList.addItem(createCard(item));
      }
    }, elementContainer);
    cardList.renderItems();
  })


// Слушатели кнопок попав добавления и редактирования
profileEditButton.addEventListener('click', openPopupEdit);
profileButtonAdd.addEventListener('click', openPopupAdd);

// Включение валидации форм
editFormValidation.enableValidation();
addFormValidation.enableValidation();


