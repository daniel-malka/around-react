export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._allInputs = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._buttonEl = this._formElement.querySelector(
      this._settings.buttonSelector
    );
  }
  resetValidation = () => {
    this._hideAllErrors();
    this._formElement.reset();
    this._disableButton();
  };
  enableValidation = () => {
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners();
  };
  _setEventListeners = () => {
    this._allInputs.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButton(this._allInputs);
      });
    });
  };
  _hideAllErrors = () => {
    this._allInputs.forEach((input) => {
      this._hideInputError(input);
    });
  };
  _disableButton = () => {
    const { buttonDisable } = this._settings;
    this._buttonEl.classList.add(buttonDisable);
    this._buttonEl.disabled = true;
  };
  _showInputError = (inputEl, errorMessage) => {
    const { inputErrorClass, spanErrorClass } = this._settings;
    this._errorDynamicSpan = this._formElement.querySelector(
      `.fieldset__error-type-${inputEl.id}`
    );
    inputEl.classList.add(inputErrorClass);
    this._errorDynamicSpan.textContent = errorMessage;
    this._errorDynamicSpan.classList.add(spanErrorClass);
  };
  _hideInputError = (inputEl) => {
    const { inputErrorClass, spanErrorClass } = this._settings;
    this._errorDynamicSpan = this._formElement.querySelector(
      `.fieldset__error-type-${inputEl.id}`
    );
    inputEl.classList.remove(inputErrorClass);
    this._errorDynamicSpan.classList.remove(spanErrorClass);
    this._errorDynamicSpan.textContent = "";
  };
  _toggleButton = (inputs) => {
    const { buttonDisable } = this._settings;
    const isInputsValid = inputs.every((input) => input.validity.valid);

    if (isInputsValid) {
      this._buttonEl.classList.remove(buttonDisable);
      this._buttonEl.disabled = false;
    } else {
      this._disableButton();
    }
  };
  _checkInputValidity = (inputEl) => {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl, inputEl.validationMessage);
    } else {
      this._hideInputError(inputEl);
    }
  };
}
