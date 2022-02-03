import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import {initialCards} from "./InitialCards.js";

const profilePopup =document.querySelector(".popup_type_profile");
const addPopup = document.querySelector(".popup_type_add-picture");
const editButton = document.querySelector(".profile__edit-button");
const profileForm = profilePopup.querySelector(".popup__form"); 
const postCreationForm = addPopup.querySelector(".popup__form"); 
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const picName = document.querySelector(".popup__input_type_pic-name");
const picLink = document.querySelector(".popup__input_type_link");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__profile-description");
const addButton = document.querySelector(".profile__add-button");
const cardName  = document.querySelector('.popup__input_type_pic-name');
const cardLink  = document.querySelector('.popup__input_type_link');
const formPicElement = document.querySelector('.popup__form_type_create');
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close-button');
const cardsContainer = document.querySelector('.elements');
const popupContainers = document.querySelectorAll('.popup__container');

// Открытие/закрытие попапа

function openPopup(popup) { 
  popup.classList.add("popup_opened"); 
  document.addEventListener("keydown", closeOnEsc);
}  

export {openPopup}

function closePopup(popup) { 
  popup.classList.remove("popup_opened"); 
  document.removeEventListener("keydown", closeOnEsc);
} 

//Попап профиль

function showProfilePopup() {

    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;

    openPopup(profilePopup);
};

//Попап добавления

function showAddPopup() {
  const addSubmitButton = addPopup.querySelector('.popup__button');

  postCreationForm.reset();
  openPopup(addPopup);
  makeButtonInvalid(addSubmitButton); 
};

function makeButtonInvalid(el) { 
  el.classList.add('.popup__button_disabled'); 
  el.disabled = true; 
} 

//Сохранение профиля

function profileFormSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(profilePopup);
}

// Крестик

closeButtons.forEach((item) => { 
  item.addEventListener("click", (event) => {
    popups.forEach(closePopup)
    }); 
}); 

// Добавление поста

function createCard(data, cardSelector) {
  const card = new Card(data, cardSelector);
  return card.generateCard();
};

initialCards.forEach((data) => {
  const htmlCard = createCard(data, '.template');
  cardsContainer.append(htmlCard); 
})

function handlePostAdd(evt) { 
  const postText = cardName.value; 
  const postLink = cardLink.value;
  const newCard = createCard({place: postText, link: postLink}, '.template'); 

  cardsContainer.prepend(newCard); 

  closePopup(addPopup); 
} 

formPicElement.addEventListener("submit", function(evt) {
  evt.preventDefault();
  handlePostAdd();
  postCreationForm.reset(); 
});

// Закрытие на overlay

popupContainers.forEach((element) => {
  element.addEventListener('click', function(evt) {
  if (evt.target === element) {
    popups.forEach((element) => {
      closePopup(element);
    })
  }
})
})

// Закрытие на Esc

function closeOnEsc(evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    popups.forEach((element) => {
    closePopup(element);
    })  
  }
}

// Валидация форм

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
}

const profileFormValidator = new FormValidator(profileForm, config);
const postCreationFormValidator = new FormValidator(postCreationForm, config);

profileFormValidator.enableValidation();
postCreationFormValidator.enableValidation();

// Слушатели

editButton.addEventListener("click", showProfilePopup);

profileForm.addEventListener("submit", profileFormSubmitHandler);  

addButton.addEventListener("click", showAddPopup);



