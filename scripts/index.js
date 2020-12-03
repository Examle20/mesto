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

//Отрыть popup для редактирования
function openPopupEdit() {
  inputName.value =  profileTitle.textContent;
  inputAbout.value = profileSubtitle.textContent;
  popupEdit.classList.add('popup_visible');
}

//закрыть popup редактирования
function closePopupEdit() {
  popupEdit.classList.remove('popup_visible');
}

// Сохранение отредактированных данных
function formSubmitHandler (event) {
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
function openPopupAdd() {
  popupAdd.classList.add('popup_visible');
}

// Закрыть popup добавления нового места
function closePopupAdd() {
  popupAdd.classList.remove('popup_visible');
}

// Вставка нового места в шаблон
function addNewPlace (placeTitle, placeUrl) {
  let elementsTemplate = elements.querySelector('#elements__template').content;
  let elementsItem = elementsTemplate.cloneNode(true);
  elementsItem.querySelector('.elements__title').textContent = placeTitle;
  elementsItem.querySelector('.elements__image').setAttribute('src', placeUrl);
  elementsItem.querySelector('.elements__basket').addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  });
  elementsContainer.prepend(elementsItem);
};

// Кнопка добавления нового места
function formSubmitAddHandler(event) {
  event.preventDefault();
  let titlePlace = popupAdd.querySelector('.popup__form-input_field_place').value;
  let urlPlace = popupAdd.querySelector('.popup__form-input_field_url').value;
  addNewPlace (titlePlace, urlPlace);
  popupAdd.querySelector('.popup__form-input_field_place').value = '';
  popupAdd.querySelector('.popup__form-input_field_url').value = '';
  closePopupAdd();
}

// Кнопка удаления места


// Обработчики кнопок для добавления||удаления нового места
profileButtonAdd.addEventListener('click', openPopupAdd);
popupCloseButtonAdd.addEventListener('click', closePopupAdd);
formAdd.addEventListener('submit', formSubmitAddHandler);
// Функция для загрузки стандартных изображений
function uploadImages() {
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

