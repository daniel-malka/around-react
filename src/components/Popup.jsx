export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  _handleOverlay = (evt) => {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  };

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
  open() {
    this._popup.classList.add("popup_open");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popup.classList.remove("popup_open");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  setEventListeners() {
    this._popup.addEventListener("mousedown", this._handleOverlay);
    this._popup
      .querySelector(".popup__close")
      .addEventListener("mousedown", () => this.close());
  }
}
