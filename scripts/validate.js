const formList = Array.from(document.querySelectorAll('.popup__form'));

// Показать текст ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__type-error');// добавили красную линию инпуту
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__form-error_active')
};

// Убрать текст ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__type-error');
  errorElement.classList.remove('popup__form-error_active');
  errorElement.textContent = '';
};

// Проверка на валидность нескольких инпутов формы одновременно
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// Включение || отключение кнопки взависимости от проверки на валидацию нескольких полей
const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add('popup__button-save_inactive');
  } else {
    buttonElement.classList.remove('popup__button-save_inactive');
  }
}

// Проверка валидности введенных данных
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// Получение элементов формы и их проверка
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__form-input'));
  const buttonElement = formElement.querySelector('.popup__button-save');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Валидация инпутов
const enableValidation = () => {
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

enableValidation();

