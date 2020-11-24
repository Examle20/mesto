const profile = document.querySelector('.profile');
const popup = document.querySelector('.popup');
const profileEditButton =  profile.querySelector('.profile__button-edit');
const popupCloseButton = popup.querySelector('.popup__button-close');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const inputName = popup.querySelector('.popup__form-input_field_name');
const inputAbout = popup.querySelector('.popup__form-input_field_about');
const saveButton = popup.querySelector('.popup__button-save');
const formEdit = popup.querySelector('.popup__form');
const elements = document.querySelector('.elements');
const likeButtons = elements.querySelectorAll('.elements__like');

profileEditButton.addEventListener('click', function () {
  popup.classList.toggle('popup__visible');
  inputName.value =  profileTitle.textContent;
  inputAbout.value = profileSubtitle.textContent;
});
popupCloseButton.addEventListener('click', function() {
  popup.classList.toggle('popup__visible');
});

function formSubmitHandler (event) {
  event.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputAbout.value;
  popup.classList.toggle('popup__visible');
}

formEdit.addEventListener('submit', formSubmitHandler);

likeButtons.forEach(function(el) {
  el.addEventListener('click', function() {
    el.classList.toggle('elements__like_status_active');
  });
});



console.log(likeButtons);
