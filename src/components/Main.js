import React from "react";
import api from "../utilities/Api";
import Card from "./Card";
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
      .then(([cardData, userData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

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
            <Card key={card._id} card={card} onCardClick={onCardClick} />;
          })}
        </ul>
      </section>
    </main>
  );
}
export default Main;
