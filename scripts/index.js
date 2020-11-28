let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');
let profileEditButton =  profile.querySelector('.profile__button-edit');
let popupCloseButton = popup.querySelector('.popup__button-close');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');
let inputName = popup.querySelector('.popup__form-input_field_name');
let inputAbout = popup.querySelector('.popup__form-input_field_about');
let formEdit = popup.querySelector('.popup__form');
let elements = document.querySelector('.elements');
let likeButtons = elements.querySelectorAll('.elements__like');

//Отрыть popup
function openPopup() {
  inputName.value =  profileTitle.textContent;
  inputAbout.value = profileSubtitle.textContent;
  popup.classList.add('popup_visible');
}
//закрыть popup
function closePopup() {
  popup.classList.remove('popup_visible');
}
// Сохранение отредактированных данных
function formSubmitHandler (event) {
  event.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputAbout.value;
  closePopup();
};

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formEdit.addEventListener('submit', formSubmitHandler);
