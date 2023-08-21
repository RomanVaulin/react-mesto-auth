import RegistrationForm from "../RegistrationForm/RegistrationForm";
import useFormValidation from "../../utils/useFormValidation";
import Input from "../Input/Input";


export default function Register({ handleRegister }) {
  const { value, error, isValid, isInputValid, handleChange } = useFormValidation()

  function onRegister(event) {
    event.preventDefault()
    handleRegister(value.password, value.email)
  }

  return (
    <RegistrationForm name='signup' onSubmit={onRegister} isValid={isValid}>
      <Input
        name='email'
        type='email'
        placeholder={'Email'}
        value={value.email}
        onChange={handleChange}
        isInputValid={isInputValid.email}
        error={error.email}
        autocomplete="current-password"
      />
      <Input
        name='password'
        type='password'
        placeholder={'Пароль'}
        minLength={3}
        value={value.password}
        onChange={handleChange}
        isInputValid={isInputValid.password}
        error={error.password}
        autocomplete="current-password"
      />
    </RegistrationForm>
  )
}