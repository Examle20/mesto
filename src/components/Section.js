export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  // Создание элементов карточек
  renderItems() {
    this._renderItems.forEach((item) => {
      this._renderer(item);
    })
  }

  // Добавление карточек в разметку
  addItem(element) {
    this._container.prepend(element);
  }
}
