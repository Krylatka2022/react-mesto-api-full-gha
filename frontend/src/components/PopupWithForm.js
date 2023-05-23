import React, { useEffect } from 'react';

function PopupWithForm({ onClose, name, isOpen, onSubmit,
	title,
	children,
	textButton, isValid }) {

	//Закрываем попапы по кнопке Escape 

	useEffect(() => {
		function onCloseEsc(evt) {
			if (evt.key === "Escape") {
				onClose();
			}
		}
		if (isOpen) {
			document.addEventListener("keydown", onCloseEsc);
		}

		//  через `return` = `clean up`-функция. Она срабатывает при перерисовке или размонтировании
		return () => {
			document.removeEventListener("keydown", onCloseEsc);
		};
	}, [isOpen]);


	//  Закрываем попапы по  клику на Overlay
	useEffect(() => {
		function onCloseOverlay(evt) {
			if (evt.target.classList.contains('popup_opened')) {
				onClose();
			}
		}
		if (isOpen) {
			document.addEventListener('mousedown', onCloseOverlay);
		}

		return () => {
			document.removeEventListener("mousedown", onCloseOverlay);
		};
	}, [isOpen]);

	return (
		<section
			className={`popup ${name} ${isOpen ? 'popup_opened' : ''
				}`}
		>
			<div className="popup__container">
				<button
					className="popup__close"
					type="button"
					aria-label="Закрыть"
					onClick={onClose}
				/>
				<form
					className={`popup__form popup__form_type_${name}`}
					name={`${name}-form`}
					onSubmit={onSubmit}
				>
					<h2 className="popup__title">{title}</h2>
					{children}
					<button
						className={`popup__submit-button ${isValid ? '' : 'popup__submit-button_disabled'} `}
						type="submit">
						{textButton}
					</button>
				</form>
			</div>
		</section>
	)
}

export default PopupWithForm
