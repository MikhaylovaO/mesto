import './index.css';
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import {initialCards} from "../utils/InitialCards.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithDelete from '../components/PopupWithDelete.js';
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {editButton, 
  profileForm, 
  postCreationForm, 
  nameInput, 
  jobInput, 
  avatarEditButton,
  addButton, 
  cardsContainer,
  avatarForm,
  profileSelectors,
  config
} from "../utils/constants.js";

// Подключаем API

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-35',
  headers: {
    'content-type': 'application/json',
    'authorization': '0314b12b-3dc3-46aa-87e9-958d68e09817'
  }
})

// Данные с сервера

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((res) => {
    userInfo.setUserInfo(res[0]);
    cards.renderItems(res[1]); 
  })
 /* .catch((err) => console.log(err));*/

// Получаем данные пользователя с сервера

const userInfo = new UserInfo(profileSelectors);

// Разметка начальных карточек

const cards = new Section({
  renderer: (item) => {
    const newCard = createCard(item);
    cards.addItem(newCard);
    }
  },
  cardsContainer
);

//Попап профиль

const profilePopup = new PopupWithForm('.popup_type_profile', {
  submitHandler: (values) => {
    profilePopup.toggleButtonText("Coxpaнение...");
    api.editProfile(values.name, values.about)
    .then((data) => {
      userInfo.setUserInfo(data);
      profilePopup.close();
    })
    .finally(() => {
      profilePopup.toggleButtonText("Сохранить")
    })
}
});

editButton.addEventListener("click", function() {
  profilePopup.open();
  
  const userDescription = userInfo.getUserInfo();

  nameInput.value = userDescription.name;
  jobInput.value = userDescription.about;

  profileFormValidator.resetErrors();
  profileFormValidator.enableSubmitButton();
});

// Картинка-попап

const picturePopup = new PopupWithImage(".popup_type_popup-picture");

// Добавление поста

const addPopup = new PopupWithForm(".popup_type_add-picture", {
  submitHandler: (values) => {
    addPopup.toggleButtonText('Создание...');
    api.postNewCard(values.name, values.link)
    .then((data) => {
      const newCard = createCard(data);
      cards.prependItem(newCard); 
      addPopup.close(); 
    })
    .finally(() => {
      addPopup.toggleButtonText('Создать');
    })  
  } 
});

addButton.addEventListener("click", () => {
  addPopup.open();
  postCreationFormValidator.resetErrors();
  postCreationFormValidator.disableSubmitButton();
});

// Попап подтверждения удаления

const deletePopup = new PopupWithDelete('.popup_type_delete-picture', {
  handleSubmitCallback: deleteCardHandler});
deletePopup.setEventListeners();


const deleteCardHandler = () => {
  console.log('deleteCardHandler');
}

// Генерация карточек

function createCard(values) {
  const card = new Card({
    data: values,
    handleCardClick: (name, link) => {
      picturePopup.open(name, link)
    },
    handleCardDelete: (cardId, card) => {
      deletePopup.open();
      deletePopup.setSubmitAction(() => {
        deletePopup.toggleButtonText('Удаление...');
        api.deleteCard(cardId)
        .then(() => {
          card.remove();
        deletePopup.close();
        })
        .finally(() => {
          deletePopup.toggleButtonText('Да');
        })
      })
    },
    handleLike: (cardId) => {
      if (card.checkIfLiked()) {
        api.removeLike(cardId)
        .then(card.updateLikes)
      }
      else {
        api.likeCard(cardId)
        .then(card.updateLikes)
      }
    },
    userId: userInfo.getUserId()
    }, 
    '.template')
return card.generateCard();
};

// Редактирование аватара

const avatarPopup = new PopupWithForm(".popup_type_avatar", {
  submitHandler: (values) => {
    avatarPopup.toggleButtonText("Сохранение...");
    api.editAvatar(values.avatar)
    .then ((data) => {
      userInfo.setUserInfo(data);
      avatarPopup.close();
    })
    .finally(() => {
      avatarPopup.toggleButtonText("Сохранить");
    })
  } 
});

avatarEditButton.addEventListener('click', () => {
  avatarPopup.open();

  avatarFormValidator.resetErrors();
  avatarFormValidator.disableSubmitButton();
});

// Валидация форм

const profileFormValidator = new FormValidator(profileForm, config);
const postCreationFormValidator = new FormValidator(postCreationForm, config);
const avatarFormValidator = new FormValidator(avatarForm, config);

profileFormValidator.enableValidation();
postCreationFormValidator.enableValidation();
avatarFormValidator.enableValidation();

