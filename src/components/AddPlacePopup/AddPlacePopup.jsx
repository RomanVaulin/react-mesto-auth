import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
// import Input from "../Input/Input"

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isSubmit }) {
    const { value, error, isValid, isInputValid, handleChange, reset } = useFormValidation();
    
    function resetAfterClose() {
        onClose();
        reset()
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({name: value.name, link: value.link}, reset)
    }

    return (
        <PopupWithForm
          name='add-card'
          title='Новое место'
          titleButton='Создать'
          isOpen = {isOpen}
          isSubmit = {isSubmit}
          isValid = {isValid}
          onClose = {resetAfterClose}
          onSubmit = {handleSubmit}
          
        >
          <input
              name="name"
              id="name-card"
              required
              minLength={2}
              maxLength={30}
              type="text"
              placeholder="Название"
              className={`popup__input popupAdd__field popupAdd__field_place_input ${isInputValid.name === undefined || isInputValid.name ? '' : 'popup__error_visible'}`}
              value={value.name ?? ''}
              disabled={isSubmit}
              onChange={handleChange}
          />
          <span id="name-card-error" className="popup__input-error">{error.name}</span>
          <input
              name="link"
              id="url-card"
              required
              type="url"
              placeholder="Ссылка на картинку"
              className={`popup__input popupAdd__field popupAdd__field_place_input ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__error_visible'}`}
              value={value.link ?? ''}
              disabled={isSubmit}
              onChange={handleChange}
          />
          <span id="url-card-error" className="popup__input-error">{error.link}</span>
        </PopupWithForm>
    )
}