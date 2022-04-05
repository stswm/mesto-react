import React from "react";

function Card({ name,likes,link,card, onCardClick }) {
  function handleClick() {
    onCardClick(card)
  }
  return (
    <li className="element">
      <button type="button" className="element__delete buttonEffect"></button>
      <img
        className="element__pic"
        src={link}
        alt={name}
        onClick={handleClick}
      />
      <h2 className="element__text">{name}</h2>
      <div className="likeShell">
        <button type="button" className="element__heart buttonEffect"></button>
        <span className="element__heart-count">{likes}</span>
      </div>
    </li>
  );
}

export default Card;
