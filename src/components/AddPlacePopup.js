import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onAddPlaceSubmit, onClose }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({
      name,
      link,
    });
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEnterSumbit);
  });

  function handleEnterSumbit(e) {
    if (e.key === "Enter") handleSubmit(e);

    return () => {
      document.removeEventListener("keydown", handleEnterSumbit);
    };
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title="New place"
      name="add-place"
      buttonText="Create"
    >
      <div className="fieldset__container">
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          className="fieldset__input fieldset__input_type-title"
          minLength={1}
          maxLength={30}
          required
        />
        <span className="fieldset__error-message fieldset__error-type-title" />
      </div>
      <div className="fieldset__container">
        <input
          type="link"
          id="link"
          name="link"
          placeholder="Link"
          className="fieldset__input fieldset__input_type_link"
          required
        />
        <span className="fieldset__error-message fieldset__error-type-link" />
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
