import close from "../images/close-X.svg";
import "../blocks/popup.css";
function PopupWithImage(props) {
  return (
    <div className={`popup popup_type_image  ${props.isOpen && "popup_open"}`}>
      <div className="popup__container-img popup__container_type_image">
        <span
          className="popup__close-button popup__close-button_type_image"
          type="button"
        >
          <img
            src={close}
            alt="close icon x"
            className="popup__close popup__close-icon_image"
            onClick={props.onClose}
          />
        </span>
        <figure>
          <img src={props.card.link} alt="#" className="popup__img" />
          <figcaption className="popup__title">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}
export default PopupWithImage;
