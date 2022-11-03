import React from "react";

import Card from "./Card";

import CurrentUserContext from "../contexts/CurrentUserContext";

import "../blocks/images.css";
import "../blocks/popup.css";
import "../blocks/gallery.css";

function Main({
  cards,
  onEditProfileClick,
  onCardClick,
  onEditAvatarClick,
  onAddCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
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
  return (
    <main className="content">
      <section className="top">
        <div className="top__container" onClick={onEditAvatarClick}>
          <img
            src={currentUser.avatar}
            alt="Profile picture"
            className="top__img"
          />
        </div>

        <div className="text">
          <div className="text__title">
            <h1 className="text__name">{currentUser.name}</h1>
            <button
              type="button"
              aria-label="button"
              onClick={onEditProfileClick}
              className="text__edit"
            />
          </div>
          <p className="text__about">{currentUser.about}</p>
        </div>

        <button
          type="button"
          aria-label="button"
          className="top__plus-box"
          onClick={onAddCardClick}
        />
      </section>
      <section className="images">
        <ul className="gallery">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
export default Main;
