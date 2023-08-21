import { useEffect, useState } from "react"
import api from "../../utils/api";

export default function LikeButton({likes, myId, cardId}) {
    const [isLiked, setIsLiked] = useState(false);
    const [countLikes, setCountLikes] = useState(likes.length);
    useEffect(() => {
        setIsLiked(likes.some(element => myId === element._id))
    }, [likes, myId])

    function handleLikeButton() {
        if(isLiked) {
            api.deleteLike(cardId)
                .then(res => {
                    setIsLiked(false)
                    setCountLikes(res.likes.length)
                })
                .catch((err) => {console.error(err)})
        } else {
            api.addLike(cardId)
                .then(res => {
                    setIsLiked(true)
                    setCountLikes(res.likes.length)
                })
                .catch((err) => {console.error(err)})
        }
    }

    return (
        <>
            <div className="element__container">
                <button
                    type="button"
                    aria-label="копка нравится"
                    className={`element__like-button ${isLiked ? 'element__like-button_active' : ''}`}
                    onClick={handleLikeButton}
                />
                <span className="element__likes_number">{countLikes}</span>
            </div>
        </>
    )
}