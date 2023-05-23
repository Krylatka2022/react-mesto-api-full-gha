import { useEffect } from 'react';

function ImagePopup({ card, onClose }) {
	useEffect(() => {
		if (!card) return; // не даем сработать эффекту, если невыбрана карточка еще 
		function closePopupEscape(event) {
			if (event.key === "Escape") {
				onClose(event);
			}
		}

		function closePopupOverlay(event) {
			if (event.target.classList.contains('popup_opened')) {
				onClose(event);
			}
		}

		document.addEventListener('keydown', closePopupEscape);
		document.addEventListener('click', closePopupOverlay);

		return () => {
			document.removeEventListener('keydown', closePopupEscape);
			document.removeEventListener('click', closePopupOverlay);
		};
	}, [onClose, card]);

	return (
		<section className={`popup popup_type_preview ${card ? 'popup_opened' : ''}`}>
			<div className="popup__preview-container">
				<img className="popup__preview-image" src={card && card.link} alt={card && card.name} />
				<button type="button" className="popup__close popup__close_type-preview" onClick={onClose}></button>
				<h2 className="popup__preview-title">{card && card.name}</h2>
			</div>
		</section>
	);
};

export default ImagePopup;