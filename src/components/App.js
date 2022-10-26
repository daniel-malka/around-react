import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";
import DeletePopupForm from "./DeletePopupForm";
import EditAvatarPopup from "./EditAvatarPopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/Api";

import "../blocks/root.css";
import "../blocks/page.css";
import "../blocks/popup.css";
import "../blocks/zoom.css";

import "../blocks/desc.css";
import "../blocks/top.css";
import "../blocks/text.css";

import "../blocks/header.css";
import "../blocks/content.css";

import "../blocks/form.css";
import "../blocks/footer.css";
import EditProfilePopup from "./EditProfilePopup";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = React.useState(false);
  const [isEditAvatarOpen, setIsEditAvatarOpen] = React.useState(false);
  const [isImgViewOpen, setIsImgViewOpen] = useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    api
      .getCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    if (isLiked) {
      api.dislikeCard(card._id).then((likedCard) => {
        const newCards = cards.map((card) => {
          return card._id == likedCard._id ? likedCard : card;
        });
        setCards(newCards);
      });
    } else {
      api.likeCard(card._id).then((likedCard) => {
        const newCards = cards.map((card) => {
          return card._id == likedCard._id ? likedCard : card;
        });
        setCards(newCards);
      });
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }

  function handleAddCardClick() {
    setIsAddCardOpen(true);
  }

  function handleCardClick(card) {
    setIsImgViewOpen(true);
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  }

  function closeAllPopups() {
    setIsEditProfileOpen(false);
    setIsAddCardOpen(false);
    setIsEditAvatarOpen(false);
    setIsImgViewOpen(false);
  }
  function handleDeleteClick(card) {
    setIsDeletePopupOpen(true);
    setSelectedCard(card);
  }
  function handleCardDelete(e) {
    e.preventDefault();

    api
      .deleteCard(selectedCard._id)
      .then(() => {
        setCards(cards);
        cards.filter((currentCard) => currentCard._id === selectedCard._id);

        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api
      .editAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(console.log);
  }

  function handleAddPlaceSubmit(card) {
    const formData = new FormData(card.target);
    const name = formData.get("title");
    const link = formData.get("link");

    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo({ name, about })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onEditProfileClick={handleEditProfileClick}
          onAddCardClick={handleAddCardClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardDelete={handleDeleteClick}
          onCardLike={handleCardLike}
        />
        <Footer />

        <EditProfilePopup
          title="Edit Profile"
          name="edit"
          isOpen={isEditProfileOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <PopupWithForm
          title="New Place"
          name="img-add"
          isOpen={isAddCardOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}
        >
          <fieldset className="fieldset">
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
          </fieldset>
        </PopupWithForm>

        {/* <PopupWithForm
          title="Are you sure?"
          onClose={closeAllPopups}
          name="delete"
          buttonText="Delete"
        /> */}

        {/* <PopupWithForm
          title="Change profile picture"
          name="avatar"
          buttonText="Create"
          isOpen={isEditAvatarOpen}
          onClose={closeAllPopups}
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
        </PopupWithForm> */}

        <EditAvatarPopup
          isOpen={isEditAvatarOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />

        <DeletePopupForm
          isOpen={isDeletePopupOpen}
          onSubmit={handleCardDelete}
          onClose={closeAllPopups}
        />

        <PopupWithImage
          card={selectedCard}
          isOpen={isImgViewOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}
export default App;
