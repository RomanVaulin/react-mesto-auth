import { useRef } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSubmit }) {
    const input = useRef();
    const { value, error, isValid, isInputValid, handleChange, reset } = useFormValidation();

    function resetAfterClose() {
        onClose();
        reset()
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({avatar: input.current.value}, reset)
    }

    return (
        <PopupWithForm
            name='edit-avatar'
            title='Обновить аватар'
            isOpen = {isOpen}
            isSubmit = {isSubmit}
            isValid = {isValid}
            onClose = {resetAfterClose}
            onSubmit = {handleSubmit}
        >
            <input
                ref={input}
                name="avatar"
                id="url-avatar"
                required
                type="url"
                placeholder="Ссылка на картинку"
                className={`popup__input popupAvatar__field popupAvatar__field_link_input ${isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'popup__error_visible'}`}
                value={value.avatar ?? ''}
                disabled={isSubmit}
                onChange={handleChange}
            />
            <span id="url-avatar-error" className="popup__input-error">{error.avatar}</span>
        </PopupWithForm>
    )
}