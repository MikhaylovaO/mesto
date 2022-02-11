const editButton = document.querySelector(".profile__edit-button");
const profileForm = document.querySelector(".popup__form_type_profile"); 
const postCreationForm = document.querySelector(".popup__form_type_create");
const avatarForm = document.querySelector(".popup__form_type_avatar");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const addButton = document.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector(".profile__avatar-container");
const cardsContainer = document.querySelector('.elements');
const profileSelectors = {
  profileName: '.profile__name', 
  profileDescription: '.profile__profile-description',
  avatarPicture: '.profile__avatar'
}
const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error'
  }

export {editButton, 
    profileForm, 
    postCreationForm, 
    nameInput, 
    avatarForm,
    jobInput, 
    addButton, 
    cardsContainer,
    profileSelectors,
    avatarEditButton,
    config
}