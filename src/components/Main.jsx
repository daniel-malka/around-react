import React from "react";
import api from "../utils/Api";
import Card from "./Card";

import "../blocks/images.css";
import "../blocks/popup.css";
import "../blocks/gallery.css";
import "../blocks/zoom.css";
function Main({
  onEditProfileClick,
  onCardClick,
  onEditAvatarClick,
  onAddCardClick,
}) {
  const [userName, setUserName] = React.useState("");
  const [useDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

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
  });
  return (
    <main className="content">
      <section className="top">
        <div className="top__container" onClick={onEditAvatarClick}>
          <img src={userAvatar} alt="Profile picture" className="top__img" />
        </div>

        <div className="text">
          <div className="text__title">
            <h1 className="text__name">{userName}</h1>
            <button
              type="button"
              aria-label="button"
              onClick={onEditProfileClick}
              className="text__edit"
            />
          </div>
          <p className="text__about">{useDescription}</p>
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
              <Card key={card._id} card={card} onCardClick={onCardClick} />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
export default Main;
