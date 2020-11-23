const profile = document.querySelector('.profile');
const popup = document.querySelector('.popup');
const profileEditButton =  profile.querySelector('.profile__button-edit');
const popupCloseButton = popup.querySelector('.popup__button-close');

profileEditButton.addEventListener('click', function () {
  popup.classList.toggle('popup__visible');
});
popupCloseButton.addEventListener('click', function(){
  popup.classList.toggle('popup__visible');
});
