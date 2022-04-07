import React from "react";
import api from "../../utils/Api";
import Card from "../Card/Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
      // подгрузка данных профиля
    api
      .getProfile()
      .then((res) => {
        const data = {
          name: res.name,
          about: res.about,
          avatar: res.avatar,
        };
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch((err) => console.log(err));
        // Подгрузка списка карточек
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <main className="main">
        <section className="profile">
          <div className="profile__avatar-editshell">
            <button
              type="button"
              className="profile__avatar-edit-button buttonEffect"
              onClick={onEditAvatar}
            >
              <img
                src={userAvatar}
                alt="Фото профиля"
                className="profile__avatar"
              />
            </button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button
              type="button"
              className="profile__edit-button buttonEffect"
              onClick={onEditProfile}
            ></button>
            <h2 className="profile__about">{userDescription}</h2>
          </div>
          <button
            type="button"
            className="profile__add-button buttonEffect"
            onClick={onAddPlace}
          ></button>
        </section>
        <section>
          <ul className="elements">
            {cards.map((card) => (
              <Card
                key={card._id}
                link={card.link}
                likes={card.likes.lenght}
                name={card.name}
                card={card}
                onCardClick={onCardClick}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
