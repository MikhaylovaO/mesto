<<<<<<< HEAD:src/pages/index.js
import './index.css';
=======
>>>>>>> 6e819d74622392cff53bc330169cb1a58fcccec3:script.js
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import {initialCards} from "../InitialCards.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

<<<<<<< HEAD:src/pages/index.js

=======
>>>>>>> 6e819d74622392cff53bc330169cb1a58fcccec3:script.js
const editButton = document.querySelector(".profile__edit-button");
const profileForm = document.querySelector(".popup__form_type_profile"); 
const postCreationForm = document.querySelector(".popup__form_type_create"); 
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const addButton = document.querySelector(".profile__add-button");
const cardName  = document.querySelector('.popup__input_type_pic-name');
const cardLink  = document.querySelector('.popup__input_type_link');
const cardsContainer = document.querySelector('.elements');
const profileSelectors = {
  profileName: '.profile__name', 
  profileDescription: '.profile__profile-description',
}

//Попап профиль

const userInfo = new UserInfo(profileSelectors);

editButton.addEventListener("click", function() {
  profilePopup.open();
  
  const userDescription = userInfo.getUserInfo();

  nameInput.value = userDescription.name;
  jobInput.value = userDescription.job;

  profileFormValidator.resetErrors();
  profileFormValidator.enableSubmitButton();
});

const profileFormSubmitHandler = () => {

  userInfo.setUserInfo({
    name: nameInput.value,
    job: jobInput.value
  });
  profilePopup.close();
}

const profilePopup = new PopupWithForm('.popup_type_profile', profileFormSubmitHandler)

profilePopup.setEventListeners();

// Картинка-попап

const picturePopup = new PopupWithImage(".popup_type_popup-picture");

// Добавление поста

addButton.addEventListener("click", () => {
  addPopup.open();
  postCreationFormValidator.resetErrors();
  postCreationFormValidator.disableSubmitButton();
});

const addPopup = new PopupWithForm(".popup_type_add-picture", handlePostAdd);

function createCard(data, cardSelector) {
  const card = new Card(data, cardSelector, {
    handleCardClick:  (place, link) => {
      picturePopup.open(place, link)
    }
    })
return card.generateCard();
};

function handlePostAdd() { 

const postText = cardName.value; 
const postLink = cardLink.value;
const newCard = createCard({place: postText, link: postLink}, '.template'); 

cardsContainer.prepend(newCard); 
postCreationForm.reset(); 

addPopup.close(); 
} 

addPopup.setEventListeners();

// Разметка начальных карточек

  const defaultCardsList = new Section({
      items: initialCards,
      renderer: (item) => {
        const newCard = createCard(item, '.template');
        defaultCardsList.addItem(newCard);
      }
    },
    cardsContainer
  );

  defaultCardsList.renderItems();

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

