export class Section {
  constructor(renderer, containerSelector) {
    // this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderInitialItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
  addItem(item) {
    this._container.prepend(item);
  }
}
