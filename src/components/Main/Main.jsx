import editLogo from '../../images/editbutton-vector.svg';
import addLogo from '../../images/addbutton-vector.svg';
import { useContext } from 'react';
import Card from '../Card/Card.jsx';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Loader from '../Loader/Loader.jsx';
import Register from "../Register/Register.jsx"
import Login from "../Login/Login.jsx"

export default function Main({onEditProfile, onAddPlace, onEditAvatar, onOpenCard, onDelete, cards, loadingCards, handleLogin, handleRegister, name}) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            {name === 'main' ?
                <>
                    <section className="profile">
                        <div className="profile__container">
                            <button type="button" className="profile__avatar-overlay" onClick={onEditAvatar} />
                            <img src={currentUser.avatar ? currentUser.avatar : '#'} alt="Аватар профиля" className="profile__avatar" />
                        </div>
                        <div className="profile__info">
                            <h1 className="profile__name">{currentUser.name ? currentUser.name : ''}</h1>
                            <button
                            type="button"
                            aria-label="кнопка редактирования"
                            className="profile__edit-button"
                            onClick={onEditProfile}
                            >
                            <img
                                className="profile__edit-button-image"
                                src={editLogo}
                                alt="кнопка редактирование"
                            />
                            </button>
                            <p className="profile__description">{currentUser.about ? currentUser.about : ''}</p>
                        </div>
                        <button
                            type="button"
                            aria-label="кнопка добавления"
                            className="profile__add-button"
                            onClick={onAddPlace}
                        >
                            <img
                            className="profile__add-button-image"
                            src={addLogo}
                            alt="кнопка добавления"
                            />
                        </button>
                    </section>
                    <ul className="elements">
                        {loadingCards ? <Loader /> : cards.map(data => {
                            return (
                                <li className="element" key = {data._id}>
                                    <Card card={data} onOpenCard={onOpenCard} onDelete={onDelete}/>
                                </li>
                            ) 
                        })}
                    </ul>
                </>
            :
            name === 'signup' ?
            <Register handleRegister={handleRegister}/>
            :
            <Login handleLogin={handleLogin}/>
            }
        </main>
    )
}