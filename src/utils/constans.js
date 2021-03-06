
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__type-error',
  errorClass: 'popup__form-error_active'
}

export const elementContainer = document.querySelector('.elements__list');
export const profile = document.querySelector('.profile');
export const profileEditButton =  profile.querySelector('.profile__button-edit');
export const profileButtonAdd = profile.querySelector('.profile__button-add');
export const userName = document.querySelector('.profile__title');
export const userAbout = document.querySelector('.profile__subtitle');
export const userAvatar = document.querySelector('.profile__photo');
export const nameInput = document.querySelector('.popup__form-input_field_name');
export const aboutInput = document.querySelector('.popup__form-input_field_about');
export const profilePhoto = document.querySelector('.profile__photo');
export const profilePhotoGroup = document.querySelector('.profile__photo-group');
export const buttonPopupDelete = document.querySelector('.popup__button-save_verification');
