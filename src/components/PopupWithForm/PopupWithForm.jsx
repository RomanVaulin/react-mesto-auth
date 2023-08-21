export default function PopupWithForm({ name, title, titleButton, children, isOpen, onClose, onSubmit, isSubmit, isValid=true }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
            <div className="popup__container" onClick={(evt => evt.stopPropagation())}>
                <button
                type="button"
                aria-label="копка закрытия"
                className="popup__close"
                onClick={onClose}
                />
                <form
                name={name}
                className="popupEdit__form popup__form"
                onSubmit={onSubmit}
                >
                    <h2 className="popupEdit__description">{title}</h2>
                    {children}
                    <button
                        className={`popupEdit__save-button popup__button ${name === 'delete' ? 'popup__button_changed' : ''} ${isSubmit ? 'popup__button_disabled' : ''} ${isValid ? '' : 'popup__button_disabled'}`}
                        aria-label="кнопка сохранить"
                        type="submit"
                        disabled={!isValid}
                    >
                        {isSubmit ? 'Подождите...' : titleButton || 'Сохранить'}
                    </button>
                </form>
            </div>
        </div>
    )
}