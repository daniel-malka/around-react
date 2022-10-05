import React from "react";

function PopupWithForm({
  title,
  name,
  isOpen,
  buttonText = "Save",
  onClose,
  children,
}) {
  return (
    <div className={`popup popup__type_${name} ${isOpen ? "popup_open" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <h3 className="popup__caption">{title}</h3>
        <form className="form" name="name" noValidate>
          {children}
          <button
            type="submit"
            className={`fieldset__button fieldset__button_type_${name}`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
