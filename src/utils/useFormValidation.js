import { useState, useCallback } from "react";


export default function useFormValidation() {
    const [value, setValue] = useState([]);
    const [error, setError] = useState([]);
    const [isValid, setIsValid] = useState(false);
    const [isInputValid, setIsinputValid] = useState({});

    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        const validationMessage = evt.target.validationMessage;
        const valid = evt.target.validity.valid;
        const form = evt.target.form;

        setValue((evt) => {
            return { ...evt, [name] : value }
        })

        setError((evt) => {
            return { ...evt, [name] : validationMessage }
        })

        setIsValid(form.checkValidity())

        setIsinputValid((evt) => {
            return { ...evt, [name] : valid }
        })
    }

    function reset(data = {}) {
        setValue(data);
        setError([]);
        setIsValid(false);
        setIsinputValid([])
    }

    const setValues = useCallback((name, values) => {
        setValue((value) => {
            return { ...value, [name]: values }
        })
    }, [])

    return { value, error, isValid, isInputValid, handleChange, reset, setValues }
}