import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ImagePopup from "../ImagePopup/ImagePopup";
import api from "../../utils/Api";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false)
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleIsConfirmDeleteClick() {
    setIsConfirmDelete(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDelete(false);
    setSelectedCard({});
  }
  useEffect(() => {
    if(isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard ){
      function handleESC(e){
        if (e.key === 'Escape'){
          closeAllPopups()
        }
      }
      document.addEventListener('keydown', handleESC)
      return () => {
        document.removeEventListener('keydown', handleESC)
      }
    }
  

  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, selectedCard])
  


  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.error(err));
    }
  }

  function handleDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((item) => item.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => console.log(err));
  }
  function handleUpdateAvatar({avatar}) {
    api.changeAvatar(avatar)
    .then(() => {
      setCurrentUser({...currentUser, avatar});
      closeAllPopups();
    }).catch((err) => console.log(err));
  }
  function handleAddPlaceSubmit(data){
    api.addCard(data.name, data.link).then((newCard)=>{
      setCards([newCard, ...cards])
      closeAllPopups()
    }).catch((err)=>console.log(err))
  }

  function handleUpdateUserInfo({name,about}) {
    api.editProfile(name,about).then((test)=>{
      setCurrentUser(test);
      closeAllPopups();
    }).catch((err) => console.log(err))
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDelete}
          onConfirmDelete={handleIsConfirmDeleteClick}
        />

        <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleUpdateAvatar}
        >
        </EditAvatarPopup>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleUpdateUserInfo}
        >
        </EditProfilePopup>

        <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleAddPlaceSubmit}
            >
        </AddPlacePopup>

        <ConfirmDelete
        isOpen={isConfirmDelete}
        onClose={closeAllPopups}
        >
        
        </ConfirmDelete>

        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
