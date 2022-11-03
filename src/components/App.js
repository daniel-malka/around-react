import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithImage from "./PopupWithImage";
import DeletePopupForm from "./DeletePopupForm";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/Api";
// last project tutor sujested me to do this beacuse it causes errors on project validation
import "../blocks/root.css";
import "../blocks/page.css";
import "../blocks/popup.css";
import "../blocks/zoom.css";

import "../blocks/desc.css";
import "../blocks/top.css";
import "../blocks/text.css";

import "../blocks/header.css";
import "../blocks/content.css";
import "../blocks/zoom.css";
import "../blocks/form.css";
import "../blocks/footer.css";

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
          return card._id === likedCard._id ? likedCard : card;
        });
        setCards(newCards);
      });
    } else {
      api.likeCard(card._id).then((likedCard) => {
        const newCards = cards.map((card) => {
          return card._id === likedCard._id ? likedCard : card;
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
    setIsDeletePopupOpen(false);
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
        const newCards = cards.filter(
          (currentCard) => currentCard._id !== selectedCard._id
        );
        setCards(newCards);
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
    console.log(card);
    api
      .addCard(card)
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

        <AddPlacePopup
          title="New Place"
          name="img-add"
          isOpen={isAddCardOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}
        />

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
