export default function InfoTooltip(props){
// ({popupStatus, isOpen, onClose}) {
    return (
      <section className={`popup popup_tooltip ${props.isOpen && 'popup_opened'}`}>
        <div className="popup__container">
          <button onClick={props.onClose} className="popup__close" type="button"></button>
          <div className="popup__contain-tooltip-status">
          <img src={props.popupStatus.image} alt={`Информационное сообщение: ${props.popupStatus.message}`} className="popup__icon" />
          <p className="popup__title popup__title_icon">{props.popupStatus.message}</p>
          </div>
        </div>
      </section>
    );
  };