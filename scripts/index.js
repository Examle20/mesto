let profile = document.querySelector('.profile');
let popupEdit = document.querySelector('.popup_edit');
let profileEditButton =  profile.querySelector('.profile__button-edit');
let popupCloseButtonEdit = popupEdit.querySelector('.popup_close-edit');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');
let inputName = popupEdit.querySelector('.popup__form-input_field_name');
let inputAbout = popupEdit.querySelector('.popup__form-input_field_about');
let formEdit = popupEdit.querySelector('.popup__form');
let elements = document.querySelector('.elements');
let likeButtons = elements.querySelectorAll('.elements__like');
let popupAdd = document.querySelector('.popup_add');
let profileButtonAdd = profile.querySelector('.profile__button-add');
let popupCloseButtonAdd = popupAdd.querySelector('.popup_close-add');
let formAdd = popupAdd.querySelector('.popup__form');
let elementsContainer = elements.querySelector('.elements__list');
let popupImage = document.querySelector('.popup_image');

//Отрыть popup для редактирования
openPopupEdit = () => {
  inputName.value =  profileTitle.textContent;
  inputAbout.value = profileSubtitle.textContent;
  popupEdit.classList.add('popup_visible');
}

//закрыть popup редактирования
closePopupEdit = () => {
  popupEdit.classList.remove('popup_visible');
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
  popupAdd.classList.add('popup_visible');
}

// Закрыть popup добавления нового места
closePopupAdd = () => {
  popupAdd.classList.remove('popup_visible');
}

// Вставка нового места в шаблон
addNewPlace = (placeTitle, placeUrl) => {
  let elementsTemplate = elements.querySelector('#elements__template').content;
  let elementsItem = elementsTemplate.cloneNode(true);
  let image = elementsItem.querySelector('.elements__image');
  elementsItem.querySelector('.elements__title').textContent = placeTitle;
  image.setAttribute('src', placeUrl);
  image.addEventListener('click', maximiseImage(placeTitle, placeUrl));
  elementsItem.querySelector('.elements__basket').addEventListener('click', removeElement);
  elementsItem.querySelector('.elements__like').addEventListener('click', putLike);
  elementsContainer.prepend(elementsItem);
};

// Функция увелечения изображения по нажатию
maximiseImage = (placeTitle, placeUrl) => {
  return () => {
    popupImage.classList.add('popup_visible');
    popupImage.querySelector('.popup__image').setAttribute('src', placeUrl);
    document.querySelector('.popup__button-close_image').addEventListener('click', closeMaximiseImage);
    document.querySelector('.popup__image-title').textContent = placeTitle;
  }
}

// Закрыть увеличенное изображение
closeMaximiseImage = () => {
  popupImage.classList.remove('popup_visible');
}

// Функция удаления элемента
removeElement = (evt) => {
  evt.target.parentElement.remove();
}

// Кнопка добавления нового места
formSubmitAddHandler = (event) => {
  event.preventDefault();
  let titlePlace = popupAdd.querySelector('.popup__form-input_field_place').value;
  let urlPlace = popupAdd.querySelector('.popup__form-input_field_url').value;
  addNewPlace (titlePlace, urlPlace);
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
  initialCards.forEach((item) => {
    addNewPlace(item.name, item.link);
  });
}
uploadImages();
