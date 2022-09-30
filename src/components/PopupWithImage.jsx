import close from "../images/close-X.svg";
function PopupWithImage(props) {
  return (
    <div
      className={`popup popup_type_image-prev ${props.isOpen && "popup_open"}`}
    >
      <div className="popup__container popup__container_type_image">
        <button
          className="popup__close-button popup__close-button_type_image"
          type="button"
        >
          <img
            src={close}
            alt="close icon x"
            className="popup__close-icon popup__close-icon_image"
            onClick={props.onClose}
          />
        </button>
        <figure>
          <img src={props.link} alt="#" className="popup__image" />
          <figcaption className="popup__caption">{props.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}
export default PopupWithImage;
