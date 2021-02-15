import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }

  // Собрать даные с инпутов формы
  _getInputValues() {
    const inputValues = {};
    this._form.querySelectorAll('.popup__form-input').forEach((item) =>{
      inputValues[item.name] = item.value;
    });
    return inputValues;
  }

  // Закрыть popup
  close() {
    super.close();
    this._form.reset();
    this._form.removeEventListener('submit', this._handleFormSubmit);
  }

  // Получение данных из инпутов для создания экземпляра Card
  returnData() {
   return  this._getInputValues();
  }

  // Повесить слушатели
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleFormSubmit, {once: true});
  }

}
