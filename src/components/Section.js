export class Section {
  constructor( renderer , containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  // Создание элементов карточек
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    })
  }

  // Добавление карточек в разметку
  addItem(element) {
    this._container.prepend(element);
  }
}
