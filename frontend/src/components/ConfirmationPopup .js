import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({ card, onClose, name, title, onCardDelete }) {

  function handleDeleteSubmit(event) {
    event.preventDefault();
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      onClose={onClose}
      name={name}
      isOpen={!!card}
      onSubmit={handleDeleteSubmit}
      title={title}
      textButton="Да"
      isValid={true}
    />

  );
};
export default ConfirmationPopup;