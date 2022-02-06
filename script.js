import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js";
import {initialCards} from "./InitialCards.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";


/*const profilePopup = document.querySelector(".popup_type_profile");
const addPopup = document.querySelector(".popup_type_add-picture");*/
const editButton = document.querySelector(".profile__edit-button");
const profileForm = document.querySelector(".popup__form_type_profile"); 
const postCreationForm = document.querySelector(".popup__form_type_create"); 
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__profile-description");
const addButton = document.querySelector(".profile__add-button");
const cardName  = document.querySelector('.popup__input_type_pic-name');
const cardLink  = document.querySelector('.popup__input_type_link');
const formPicElement = document.querySelector('.popup__form_type_create');
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close-button');
const cardsContainer = document.querySelector('.elements');
/*const popupContainers = document.querySelectorAll('.popup__container');
const profileSubmitButton = profilePopup.querySelector('.popup__button');
const popupPicture = document.querySelector('.popup__picture');
const popupDescription = document.querySelector('.popup__picture-description');*/
/*const picturePopup = document.querySelector(".popup_type_popup-picture");*/


//Попап профиль

const userInfo = new UserInfo({nameElement: profileName, jobElement: profileDescription});

editButton.addEventListener("click", () => {
  profilePopup.open();
  
  const userDescription = userInfo.getUserInfo();

  nameInput.value = userDescription.name;
  jobInput.value = userDescription.job;

  profileFormValidator.resetErrors();
  profileFormValidator.enableSubmitButton();
});

const profilePopup = new PopupWithForm(".popup_type_profile", {
  formSubmitHandler: profileFormSubmitHandler}
/*{  formSubmitHandler: ({name, job}) => {
      userInfo.setUserInfo({name, job});  
      profilePopup.close();
  }
}*/);

/*profileForm.addEventListener("submit", profileFormSubmitHandler); */

function profileFormSubmitHandler(evt) {
  /*evt.preventDefault();*/
  userInfo.setUserInfo();  
/*
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
*/
  profilePopup.close();
}

profilePopup.setEventListeners();

// Картинка-попап

const picturePopup = new PopupWithImage(".popup_type_popup-picture");

// Добавление поста

const addPopup = new PopupWithForm(".popup_type_add-picture", {
  formSubmitHandler: handlePostAdd
});

addButton.addEventListener("click", () => {
  addPopup.open();
  postCreationFormValidator.resetErrors();
  postCreationFormValidator.disableSubmitButton();
});

function createCard(data, cardSelector) {
  const card = new Card(data, cardSelector, {
    handleCardClick:  (place, link) => {
      picturePopup.open(place, link)
    }
    })
return card.generateCard();
};

function handlePostAdd(evt) { 
evt.preventDefault();

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

// Слушатели





