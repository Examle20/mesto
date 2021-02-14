import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { validationConfig} from '../utils/constans.js';
import { UserInfo } from '../components/UserInfo.js'
import { Section } from '../components/Section';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm';
import { Api } from "../components/Api";
import {ConfirmationPopup} from "../components/ConfirmationPopup";
import {
  elementContainer,
  profileEditButton,
  profileButtonAdd,
  nameInput,
  aboutInput,
  profilePhoto,
  profilePhotoGroup } from '../utils/constans'

// Создание класса для работы с запросами
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: '1ab383b2-76d9-452f-83da-c9ac4a4eb776',
    contentType: 'application/json'
  }
});

// Экземпляр класса для работы с данными профиля
const userInfo = new UserInfo({nameSelector:'.profile__title',
  aboutSelector:'.profile__subtitle',
  avatarSelector: '.profile__photo'
})

// Класс отрисовки карточек
const cardList = new Section(
  (item) => {
      cardList.addItem(createCard(item))
  }
  , elementContainer);

// Экземпляры класса для валидации форм
const editFormValidation = new FormValidator(validationConfig, '.popup_edit');
const addFormValidation = new FormValidator(validationConfig, '.popup_add');
const avatarFormValidation = new FormValidator(validationConfig,'.popup_avatar')

// Загрузка карточек
api.getInitialCards()
  .then(res => cardList.renderItems(res))

// Получение и установка данных пользователя
api.getUser()
  .then((res) => {
    userInfo.setUserInfo(res)
    userInfo.getUserId(res._id)
  })

// Изменение текста кнопки при сохранении
const changeStateButton = (popupSelector) => {
  const buttonElement = document.querySelector(popupSelector)
    .querySelector('.popup__button-save');
  if (popupSelector === '.popup_edit' || popupSelector === '.popup_avatar') {
    if(buttonElement.textContent === 'Сохранить') {
      buttonElement.textContent = 'Сохранение...';
    }else {
      buttonElement.textContent = 'Сохранить' ;
    }
  } else {
      if(buttonElement.textContent === 'Создать'){
        buttonElement.textContent = 'Создание...';
    } else {
      buttonElement.textContent = 'Создать';
    }
  }
}

// Popup профиля
const popupEdit = new PopupWithForm('.popup_edit', (evt) => {
  evt.preventDefault();
  changeStateButton('.popup_edit');
  api.editUserInfo(nameInput.value, aboutInput.value)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEdit.close();
      changeStateButton('.popup_edit');
      editFormValidation.disableButton();
    })
  });

// Popup для увеличения изображений
const popupWithImage = new PopupWithImage('.popup_image');
const popupDelete = new ConfirmationPopup('.popup_delete',)

const removeCard = (card) => {
  return () => {
    console.log(card)
    api.removeCard(card.returnCardId())
      .then((res) => {
        if(res.status) card.deleteCard();
        popupDelete.close();
      })
  }
}

// Создание новой карточки
const createCard = ({name, link, likes, owner, _id}) => {
  //const items = checkData({name, link, likes, owner, _id});
  const card = new Card({name, link, likes, owner, _id, userId: userInfo.returnUserId()}, '.elements__template', () => {
    popupWithImage.open({name, link});
    popupWithImage.setEventListeners();
  }, ()=> {
    popupDelete.setEventListeners(removeCard(card));
    popupDelete.open();
  }, ()=> {
    api.putLike(card.returnCardId())
      .then((res) => {
        card.showLikesCounter(res.likes.length)
      })
  }, () => {
    api.removeLike(card.returnCardId())
      .then((res) => {
        card.showLikesCounter(res.likes.length)
      })
  })
  return card.createCard();
}

// Popup добавления новых карточек
const popupAdd = new PopupWithForm('.popup_add', (evt) => {
  evt.preventDefault();
  changeStateButton('.popup_add');
  api.addCard(popupAdd.returnData())
    .then((res) => {
      cardList.addItem(createCard({name: res.name, link: res.link, likes: res.likes,
        owner: res.owner, _id: res._id} ));
      popupAdd.close();
      changeStateButton('.popup_add');
      addFormValidation.disableButton();
    })
});

const popupAvatar = new PopupWithForm('.popup_avatar', (evt) => {
  evt.preventDefault();
  changeStateButton('.popup_avatar');
  api.changeAvatar(popupAvatar.returnData())
    .then((res) => {
      userInfo.setUserInfo(res)
      popupAvatar.close();
      changeStateButton('.popup_avatar');
    })
})

const openAvatar  = () => {
  popupAvatar.open();
  avatarFormValidation.disableButton();
  avatarFormValidation.resetValidation();
  popupAvatar.setEventListeners();
}
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

// Слушатели кнопок попав добавления и редактирования
profileEditButton.addEventListener('click', openPopupEdit);
profileButtonAdd.addEventListener('click', openPopupAdd);
profilePhotoGroup.addEventListener('click',openAvatar );

// Включение валидации форм
editFormValidation.enableValidation();
addFormValidation.enableValidation();
avatarFormValidation.enableValidation();


