const profilePopup =document.querySelector(".popup_type_profile");
const addPopup = document.querySelector(".popup_type_add-picture");
const picturePopup = document.querySelector(".popup_type_popup-picture")
const editButton = document.querySelector(".profile__edit-button");
const formElement = document.querySelector(".popup__form"); 
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
const popup = document.querySelectorAll('.popup');
const closeButton = document.querySelectorAll('.popup__close-button');
const createForm = document.querySelector('.popup__form_type_create');
const profileForm = document.querySelector('.popup__form_type_profile');
const cardsContainer = document.querySelector('.elements');

//Постоянные карточки

const initialCards = [
  {
    place: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    place: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
 {
    place: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
 },
{
   place: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
 {
    place: 'Холмогорский район',
   link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
  place: 'Байкал',
 link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];

// Открытие/закрытие попапа

function openPopup(popup) {
  popup.classList.add("popup_opened");
} 

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//Попап профиль

function showProfilePopup() {
    profileForm.reset();
    const profileErrorMessage = profilePopup.querySelectorAll('.popup__input-error');
    const profileSubmitButton = profilePopup.querySelector('.popup__button');

    makeButtonValid(profileSubmitButton);

    profileErrorMessage.forEach((el) => {
      deleteErrorMessage(el);
    });
    
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;

    openPopup(profilePopup);
};

function deleteErrorMessage(el) {
  el.textContent = '';
  el.classList.remove('.popup__input-error');
}

function makeButtonValid(el) {
  el.classList.remove('.popup__button_disabled');
  el.disabled = false;
}

//Попап добавления

function showAddPopup() {
  const addSubmitButton = addPopup.querySelector('.popup__button');

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

// Карточки

function createNewPost(el) {
  const cardTemplate = document.querySelector('#cardTemplate').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const likeButton = cardElement.querySelector(".element__like-button");
  const elementPicture = cardElement.querySelector('.element__mask');
  const deleteButton = cardElement.querySelector('.element__delete-button');

  cardElement.querySelector('.element__element-name').textContent = el.place;
  cardElement.querySelector('.element__mask').src = el.link;
  cardElement.querySelector('.element__mask').alt = el.place;

  elementPicture.addEventListener("click", handleImgClick);

  likeButton.addEventListener("click", (event) => {
    likeButton.classList.toggle("element__like-button_active");
  });

  deleteButton.addEventListener("click", (event) => {
    event.target.parentElement.remove();
  });

  return cardElement;
}

function handlePostAdd(evt) {
  const postText = cardName.value;
  const postLink = cardLink.value;
  const newCard = createNewPost({place: postText, link: postLink});

  cardsContainer.prepend(newCard);

  closePopup(addPopup);
}

function render() {
  const htmlCard = initialCards.map((el) => {
    return createNewPost(el);
  });
  cardsContainer.append(...htmlCard);
}

render();

// Попап-картинка

function handleImgClick (event) {
  const eventTarget = event.target;
  const cardItem = eventTarget.closest('.element');
  const popupPicture = document.querySelector('.popup__picture');
  const popupDescription = document.querySelector('.popup__picture-description');
  popupDescription.textContent = cardItem.textContent;
  popupPicture.src = cardItem.querySelector('.element__mask').src;
  popupPicture.alt = cardItem.textContent;

  openPopup(picturePopup);
}

// Крестик

closeButton.forEach((item) => { 
  item.addEventListener("click", (event) => {
    popup.forEach(closePopup)
    }); 
}); 

// Добавление поста

formPicElement.addEventListener("submit", function(evt) {
  evt.preventDefault();
  handlePostAdd();
  createForm.reset(); 
});

// Валидация форм

const showError = (form, input, errorMessageText, errorMessageClass, inputErrorClass) => {
  const errorMessage = form.querySelector(`#${input.id}-error`);
  errorMessage.textContent = errorMessageText;
  errorMessage.classList.add(errorMessageClass);
  input.classList.add(inputErrorClass);
}

const hideError = (form, input, errorMessageClass, inputErrorClass) => {
  const errorMessage = form.querySelector(`#${input.id}-error`);
  errorMessage.textContent = '';
  errorMessage.classList.remove(errorMessageClass);
  input.classList.remove(inputErrorClass);
}

const hasInvalidInput = (inputs) => {
  return Array.from(inputs).some((el) => !el.validity.valid);
}

const toggleButtonError = (inputs, button, inactiveButtonClass) => {
  if (hasInvalidInput(inputs)) {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  }
}

const checkIfInputValid = (form, input, {inputErrorClass, errorClass}) => {
  if (!input.validity.valid) {
    showError(form, input, input.validationMessage, errorClass, inputErrorClass);
  } else {
    hideError(form, input, inputErrorClass, errorClass);
  }
}

const setInputListeners = (form, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
  const inputs = form.querySelectorAll(inputSelector);
  const submitButton = form.querySelector(submitButtonSelector);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkIfInputValid(form, input, rest);
      toggleButtonError(inputs, submitButton, inactiveButtonClass);
    });
  });
}

const enableValidation = ({formSelector, ...rest}) => {
  const forms = document.querySelectorAll(formSelector);

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    setInputListeners(form, rest);
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
});

// Закрытие на overlay

const popupContainer = document.querySelectorAll('.popup__container');

popupContainer.forEach((element) => {
document.addEventListener('click', function(evt) {
  if (evt.target === element) {
    popup.forEach((element) => {
      closePopup(element);
    })
  }
})
})

// Закрытие на Esc

function closeOnEsc(evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    popup.forEach((element) => {
    closePopup(element);
    })  
  }
}

// Слушатели

editButton.addEventListener("click", showProfilePopup);

formElement.addEventListener("submit", profileFormSubmitHandler); 

addButton.addEventListener("click", showAddPopup);

document.addEventListener("keydown", closeOnEsc);