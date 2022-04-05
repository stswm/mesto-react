import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import ImagePopup from "../ImagePopup/ImagePopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState([])
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick (card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard([])
  }
  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        name="edit-avatar"
        title="Обновить аватар"
        BTNtext="Сохранить"
      >
        <input
          name="avatar"
          id="avatar"
          className="popup__input popup__input_avatar"
          placeholder="Укажите ссылку на аватар"
          type="url"
          required
        />
        <div id="error_avatar" className="popup__input-error-message"></div>
      </PopupWithForm>
      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        name="type_edit"
        title="Редактировать профиль"
        BTNtext="Сохранить"
      >
        <input
          name="name"
          id="name"
          className="popup__input popup__input_type_name"
          minLength="2"
          maxLength="40"
          placeholder="Введите Имя"
          type="text"
          required
        />
        <div id="error_name" className="popup__input-error-message"></div>
        <input
          name="about"
          id="about"
          className="popup__input popup__input_type_about"
          minLength="2"
          maxLength="200"
          placeholder="Немного о себе"
          type="text"
          required
        />
        <div id="error_about" className="popup__input-error-message"></div>
      </PopupWithForm>
      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        name="add-card"
        title="Новое место"
        BTNtext="Добавить"
      >
        <input
          name="name"
          id="card-name"
          className="popup__input popup__input_card-name"
          minLength="2"
          maxLength="30"
          placeholder="Название"
          type="text"
          required
        />
        <div id="error_card-name" className="popup__input-error-message"></div>
        <input
          name="link"
          id="card-link"
          className="popup__input popup__input_card-link"
          placeholder="Ссылка на картинку"
          type="url"
          required
        />
        <div id="error_card-link" className="popup__input-error-message"></div>
      </PopupWithForm>
      <ImagePopup
      card={selectedCard}
      onClose={closeAllPopups}
      />
      <Footer />
    </div>
  );
}

export default App;
