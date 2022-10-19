import React from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `gallery__bin ${
    isOwn ? "" : "gallery__bin_disabled"
  }`;

  const isLiked = card.likes.some((user) => user._id === currentUser._id);
  const cardLikeButtonClassName = `like__button ${
    isLiked ? "element__title-button_active" : "element__title-button"
  }`;

  return (
    <li className="gallery__item">
      <img
        src={card.link}
        alt={card.name}
        onClick={handleClick}
        className="gallery__img"
      />
      <span className={cardDeleteButtonClassName} onClick={handleCardDelete} />
      <div className="desc">
        <h2 className="desc__text">{card.name}</h2>
        <div className="like">
          <button
            type="button"
            aria-label="button"
            id="like__button"
            className="like__button"
            onClick={handleLikeClick}
          />
          <p className="like__counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
};
export default Card;
