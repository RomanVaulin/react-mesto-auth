import { useContext, useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"
import CurrentUserContext from "../../contexts/CurrentUserContext";


export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSubmit }) {
    const currentUser = useContext(CurrentUserContext);
    const { value, error, isValid, isInputValid, handleChange, reset, setValues } = useFormValidation();

    useEffect(() => {
        setValues("username", currentUser.name);
        setValues("job", currentUser.about)
    }, [currentUser, setValues])

    function resetAfterClose() {
        onClose();
        reset({username: currentUser.name, job: currentUser.about})
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({ username: value.username, job: value.job }, reset)
    }

    return (
        <PopupWithForm
          name='edit-profile'
          title='Редактировать профиль'
          isOpen = {isOpen}
          onClose = {resetAfterClose}
          isValid = {isValid}
          isSubmit = {isSubmit}
          onSubmit = {handleSubmit}
        >
          <input
              name="username"
              id="user-name-card"
              required
              minLength={2}
              maxLength={40}
              type="text"
              placeholder="Имя пользователя"
              className={`popup__input popupEdit__field popupEdit__field_name_input ${isInputValid.username === undefined || isInputValid.username ? '' : 'popup__error_visible'}`}
              value={value.username ?? ''}
              disabled={isSubmit}
              onChange={handleChange}
          />
          <span id="user-name-card-error" className="popup__input-error">{error.username}</span>
          <input
              name="job"
              id="job-card"
              required
              minLength={2}
              maxLength={200}
              type="text"
              placeholder="Род деятельности"
              className={`popup__input popupEdit__field popupEdit__field_description_input ${isInputValid.job === undefined || isInputValid.job ? '' : 'popup__error_visible'}`}
              value={value.job ?? ''}
              disabled={isSubmit}
              onChange={handleChange}
          />
          <span id="job-card-error" className="popup__input-error">{error.job}</span>
        </PopupWithForm>
    )
}