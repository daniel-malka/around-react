import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";

import "../blocks/page.css";
import "../blocks/popup.css";

import "../blocks/desc.css";
import "../blocks/top.css";
import "../blocks/text.css";

import "../blocks/header.css";
import "../blocks/content.css";

import "../blocks/form.css";
import "../blocks/footer.css";

function App() {
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = React.useState(false);
  const [isEditAvatarOpen, setIsEditAvatarOpen] = React.useState(false);
  const [isImgViewOpen, setIsImgViewOpen] = useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });

  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }

  function handleAddCardClick() {
    setIsAddCardOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarOpen(true);
  }

  function handleCardClick(card) {
    setIsImgViewOpen(true);
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  }

  function closeAll() {
    setIsEditProfileOpen(false);
    setIsAddCardOpen(false);
    setIsEditAvatarOpen(false);
    setIsImgViewOpen(false);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfileClick={handleEditProfileClick}
        onAddCardClick={handleAddCardClick}
        onEditAvatarClick={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        title="Edit Profile"
        name="edit"
        isOpen={isEditProfileOpen}
        onClose={closeAll}
      >
        <fieldset className="fieldset">
          <div className="fieldset__container">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              defaultValue=""
              className="fieldset__input fieldset__input_type_name"
              minLength={2}
              maxLength={40}
              required
            />
            <span className="fieldset__error-message fieldset__error-type-name" />
          </div>
          <div className="fieldset__container">
            <input
              type="text"
              id="about"
              name="about"
              placeholder="about"
              defaultValue=""
              className="fieldset__input fieldset__input_type_about"
              minLength={2}
              maxLength={200}
              required
            />
            <span className="fieldset__error-message fieldset__error-type-about" />
          </div>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        title="New Place"
        name="img-add"
        isOpen={isAddCardOpen}
        onClose={closeAll}
      >
        <fieldset className="fieldset">
          <div className="fieldset__container">
            <input
              type="text"
              id="title"
              name="title"
              defaultValue
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
              defaultValue
              placeholder="Link"
              className="fieldset__input fieldset__input_type_link"
              required
            />
            <span className="fieldset__error-message fieldset__error-type-link" />
          </div>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        title="Are you sure?"
        onClose={closeAll}
        name="delete"
        buttonText="Delete"
      />

      <PopupWithForm
        title="Change profile picture"
        name="avatar"
        buttonText="Create"
        isOpen={isEditAvatarOpen}
        onClose={closeAll}
      >
        <fieldset className="fieldset">
          <div className="fieldset__container">
            <input
              type="url"
              id="url"
              name="link"
              defaultValue
              placeholder="picture"
              className="fieldset__input fieldset__input_type-link"
              required
            />
            <span className="fieldset__error-message fieldset__error-type-link" />
          </div>
        </fieldset>
      </PopupWithForm>

      <PopupWithImage
        card={selectedCard}
        isOpen={isImgViewOpen}
        onClose={closeAll}
      />
    </div>
  );
}
export default App;
