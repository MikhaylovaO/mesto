import './index.css';
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import {initialCards} from "../utils/InitialCards.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {editButton, 
  profileForm, 
  postCreationForm, 
  nameInput, 
  jobInput, 
  addButton, 
  cardsContainer,
  profileSelectors,
  config
} from "../utils/constants.js";

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

const profilePopup = new PopupWithForm('.popup_type_profile', {
  submitHandler: (data) => {
  userInfo.setUserInfo(data);
  profilePopup.close();
}
})

profilePopup.setEventListeners();

// Картинка-попап

const picturePopup = new PopupWithImage(".popup_type_popup-picture");

// Добавление поста

addButton.addEventListener("click", () => {
  addPopup.open();
  postCreationFormValidator.resetErrors();
  postCreationFormValidator.disableSubmitButton();
});

const addPopup = new PopupWithForm(".popup_type_add-picture", {
  submitHandler: (data) => {
    const newCard = createCard(data, '.template');

    defaultCardsList.prependItem(newCard); 
    postCreationForm.reset(); 
  
    addPopup.close(); 
  } });

console.log(addPopup);

function createCard(data, cardSelector) {
  const card = new Card(data, cardSelector, {
    handleCardClick:  (place, link) => {
      picturePopup.open(place, link)
    }
    })
return card.generateCard();
};

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

const profileFormValidator = new FormValidator(profileForm, config);
const postCreationFormValidator = new FormValidator(postCreationForm, config);

profileFormValidator.enableValidation();
postCreationFormValidator.enableValidation();

