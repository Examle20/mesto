// Скрыть ошибки если они были перед закрытием попапа
export const hideAllErrors = (popup) => {
  const errorList = popup.querySelectorAll('.popup__form-error');
  const inputList = popup.querySelectorAll('.popup__form-input');
  inputList.forEach((item) => {
    item.classList.remove('popup__type-error');
  });
  errorList.forEach((item) => {
    item.classList.remove('popup__form-error_active');
  })
}
