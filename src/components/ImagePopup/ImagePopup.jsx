export default function ImagePopup({card, isOpen, onClose}) {
    return (
      <div className={`popup popupImage ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
        <div className="popupImage__wrapper" onClick={(evt => evt.stopPropagation())}>
          <button
            type="button"
            aria-label="копка закрытия"
            className="popup__close"
            onClick={onClose}
          />
          <img src={card.link} alt={card.name} className="popupImage__image-opened" />
          <h2 className="popupImage__caption">{card.name}</h2>
        </div>
      </div>
    )
}