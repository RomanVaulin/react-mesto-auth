import RegistrationForm from '../RegistrationForm/RegistrationForm'
import useFormValidation from '../../utils/useFormValidation'
import Input from "../Input/Input";


export default function Login({ handleLogin }) {
  const { value, error, isValid, isInputValid, handleChange } = useFormValidation()
  
  function onLogin(evt) {
    evt.preventDefault()
    handleLogin(value.password, value.email)
  }


  return (
    <RegistrationForm name='signin' onSubmit={onLogin} isValid={isValid}>
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