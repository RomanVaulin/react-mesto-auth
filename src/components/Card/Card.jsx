import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import LikeButton from "../LikeButton/LikeButton.jsx";

export default function Card({ card, onOpenCard, onDelete }) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <>
            <img src={card.link} alt={card.name} className="element__image" onClick={() => onOpenCard({link: card.link, name: card.name})} />
            <div className="element__group">
                <h2 className="element__description">{card.name}</h2>
                <LikeButton likes={card.likes} myId={currentUser._id} cardId={card._id}/>
            </div>
            {currentUser._id === card.owner._id && <button
                className="element__trash"
                type="button"
                aria-label="кнопка удаления"
                onClick={() => onDelete(card._id)}
            />}
        </>
    )
}