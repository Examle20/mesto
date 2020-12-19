

// Показать текст ошибки
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);// добавили красную линию инпуту
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// Убрать текст ошибки
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

// Проверка на валидность нескольких инпутов формы одновременно
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// Включение || отключение кнопки взависимости от проверки на валидацию нескольких полей
const toggleButtonState = (inputList, buttonElement, config) => {
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

// Проверка валидности введенных данных
const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

// Получение элементов формы и их проверка
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

// Валидация инпутов
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__type-error',
  errorClass: 'popup__form-error_active'
}

enableValidation(validationConfig);

