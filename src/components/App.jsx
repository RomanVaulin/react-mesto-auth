import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useCallback, useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js"
import api from "../utils/api.js"
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import SendContext from "../contexts/SendContext.js";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import { getUserData } from "../utils/auth.js";
import { authorization } from "../utils/auth.js";
import { auth } from "../utils/auth.js";
import ProtectedRouteData from "./ProtectedRouteData/ProtectedRouteData.jsx";

function App() {
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [dataUser, setDataUser] = useState("");

  const [cards, setCards] = useState([]);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [deleteCardId, setDeleteCardId] = useState('');

  const [popupState, setPopupState] = useState("close");

  const [isError, setIsError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const open =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isDeletePopupOpen ||
    isImagePopupOpen ||
    isError;


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteClick(cardId) {
    setDeleteCardId(cardId);
    setIsDeletePopupOpen(true);
  }

  const setStatesforClosingPopups = useCallback (() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePopupOpen(false);
    setPopupState("close");
    setIsError(false);
  }, [])

  useEffect(() => {
    const handleCloseByEsc = (evt) => {
      if (evt.key === "Escape") {
        handleClosePopups()
      }
    };
    document.addEventListener('keydown', handleCloseByEsc);
    return () => document.removeEventListener('keydown', handleCloseByEsc); 
  }, [open])// eslint-disable-line
  
  const handleCloseByOverlay = useCallback((evt) => {
    if (evt.target === evt.currentTarget) {
      handleClosePopups()
    }
  }, [open])// eslint-disable-line
 
  const handleClosePopups = useCallback(() => {
    setStatesforClosingPopups();
  }, [setStatesforClosingPopups, handleCloseByOverlay]) // eslint-disable-line

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }
  
  useEffect(() => {
    setIsLoadingCards(true);
    Promise.all([api.getInfo(), api.getCards()])
      .then(([dataUser, dataCards]) => {
        setCurrentUser(dataUser);
        setCards(dataCards);
        setIsLoadingCards(false)
      })
      .catch((err) => {console.error(err)})
  },[])

  useEffect(() => {
    if (localStorage.jwt) {
      getUserData(localStorage.jwt)
        .then((res) => {
          setDataUser(res.data.email);
          setLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {console.error(err)})
    }
  }, [navigate]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInfo(), api.getCards()])
        .then(([dataUser, dataCards]) => {
          setCurrentUser(dataUser);
          setCards(dataCards);
        })
        .catch((err) => {console.error(err)})
    }
  }, [loggedIn]);

  function handleDeleteCard(evt) {
    evt.preventDefault();
    setIsSubmit(true);
    api.deleteCard(deleteCardId)
      .then(() => {
        setCards(cards.filter(element => {
          return element._id !== deleteCardId
        }))
        handleClosePopups();
        setIsSubmit(false)
      })
      .catch((err) => {console.error(err)})
      .finally(() => setIsSubmit(false))
  }

  function handleUpdateUser(dataUser, reset) {
    setIsSubmit(true);
    api.setUserInfo(dataUser)
      .then(res => {
        setCurrentUser(res);
        handleClosePopups();
        reset();
        setIsSubmit(false)
      })
      .catch((err) => {console.error(err)})
      .finally(() => setIsSubmit(false))
  }

  function handleUpdateAvatar(dataUser, reset) {
    setIsSubmit(true);
    api.setNewAvatar(dataUser)
      .then(res => {
        setCurrentUser(res)
        handleClosePopups()
        reset()
        setIsSubmit(false)
      })
      .catch((err) => {console.error(err)})
      .finally(() => setIsSubmit(false))
  }

  function handleAddPlaceSubmit(dataCard, reset) {
    setIsSubmit(true);
    api.addCard(dataCard)
      .then((res) => {
        setCards([res, ...cards])
        handleClosePopups()
        reset()
        setIsSubmit(false)
      })
      .catch((err) => {console.error(err)})
      .finally(() => setIsSubmit(false))
  }

  function handleLogin(password, email) {
    setIsSubmit(true);
    authorization(password, email)
      .then((res) => {
        setIsSubmit(false);
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        setIsSubmit(false);
        setIsError(true);
        console.log(`${error}`);
      });
  }

  function handleRegister(password, email) {
    setIsSubmit(true);
    auth(password, email)
      .then((res) => {
        setIsSubmit(false);
        setPopupState("success");
        // setIsSuccessful(true);
        // setInfoToolTipPopupOpen(true);
        navigate("/sign-in"); //авторизации пользователя.
      })
      .catch((error) => {
        setIsSubmit(false);
        setPopupState("failure");
        // setIsError(true);
        // setIsSuccessful(false);
        // setInfoToolTipPopupOpen(true);
        console.log(`Ошибкак при регистрации: ${error}`);
      });
  }



  return (
    <>
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        
        {/* <Header/>

        <Main
          onEditProfile = {handleEditProfileClick}
          onAddPlace = {handleAddPlaceClick}
          onEditAvatar = {handleEditAvatarClick}
          onOpenCard = {handleCardClick}
          onDelete = {handleDeleteClick}
          cards = {cards}
          loadingCards = {isLoadingCards}
        /> */}

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={ProtectedRouteData}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onDelete = {handleDeleteClick}
                onOpenCard = {handleCardClick}
                cards={cards}
                oadingCards = {isLoadingCards}
                loggedIn={loggedIn}
                dataUser={dataUser}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Header name="signup" />
                <Main name="signup" handleRegister={handleRegister} />
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Header name="signin" />
                <Main name="signin" handleLogin={handleLogin} />
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer/>

        <SendContext.Provider value={isSubmit}>
          <EditProfilePopup
            onUpdateUser = {handleUpdateUser}
            isOpen = {isEditProfilePopupOpen}
            onClose = {handleClosePopups}
            isSubmit = {isSubmit}
          />

          <AddPlacePopup
            onAddPlace = {handleAddPlaceSubmit}
            isOpen = {isAddPlacePopupOpen}
            onClose = {handleClosePopups}
            isSubmit = {isSubmit}
          />

          <EditAvatarPopup
            isOpen = {isEditAvatarPopupOpen}
            onClose = {handleClosePopups}
            onUpdateAvatar = {handleUpdateAvatar}
            isSubmit = {isSubmit}
          />

          <PopupWithForm
            name='delete'
            title='Вы уверены?'
            titleButton='Да'
            isOpen={isDeletePopupOpen}
            onClose={handleClosePopups}
            onSubmit={handleDeleteCard}
            isSubmit={isSubmit}
          />

          <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={handleClosePopups}/>
        </SendContext.Provider>

        {popupState === "success" && (
          <InfoTooltip open={true} onClose={handleClosePopups} isSuccess={true} />
        )}

        {popupState === "failure" && (
          <InfoTooltip open={true} onClose={handleClosePopups} isSuccess={false} />
        )}
      </div>
    </CurrentUserContext.Provider>
  </>

  );
}

export default App;
