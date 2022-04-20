import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function ConfirmDelete({ isOpen, onClose }) {
  return (
    <PopupWithForm
    name="confirm"
    title="are you shure"
    BTNtext="yep"
    isOpen={isOpen}
    onClose={onClose}
    >
    </PopupWithForm>
  )
}

{/* <div class="popup__shell">
<button type="button" class="popup__close buttonEffect"></button>
<form name="deleteConfirm" class="popup__container popup__container_confirm" id="deleteConfirm">
  <h2 class="popup__title popup__title-confirm">Вы уверены?</h2>
  <button class="popup__save popup__delete-confirm" type="submit"
    form="deleteConfirm">Да</button>
</form>
</div> */}