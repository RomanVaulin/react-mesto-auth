import SuccessIcon from "../../images/Succes.svg";
import FailIcon from "../../images/Error.svg";
import React from "react";

function InfoToolTip(props) {
  return (
    <div
      className={`popup popup_type_tooltip ${props.open ? "popup_opened" : ""}`}
    >
      <div className="popup__container popup__container_tooltip">
        {props.isSuccess ? (
          <>
            <img
              src={`${SuccessIcon}`}
              alt="Регистрация прошла успешно."
              className="popup__tooltip_image"
            />
            <p className="popup__tooltip_message">
              Вы успешно зарегистрировались!
            </p>
          </>
        ) : (
          <>
            <img
              src={`${FailIcon}`}
              alt="Регистрация не была выполнена."
              className="popup__tooltip_image"
            />
            <p className="popup__tooltip_message">
              Что-то пошло не так. Попробуйте ещё раз!
            </p>
          </>
        )}

        <button type="button" className="popup__close" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default InfoToolTip;