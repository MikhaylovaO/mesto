const profilePopup =document.querySelector(".popup_type_profile");
const addPopup = document.querySelector(".popup_type_add-picture");
const picturePopup = document.querySelector(".popup_type_popup-picture")
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
const popupPicture = document.querySelector('.popup__picture');
const popupDescription = document.querySelector('.popup__picture-description');
const popupContainers = document.querySelectorAll('.popup__container');

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
  document.addEventListener("keydown", closeOnEsc);
}  

function closePopup(popup) { 
  popup.classList.remove("popup_opened"); 
  document.removeEventListener("keydown", closeOnEsc);
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
  elementPicture.src = el.link;
  elementPicture.alt = el.place;

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

  popupDescription.textContent = cardItem.textContent;
  popupPicture.src = cardItem.querySelector('.element__mask').src;
  popupPicture.alt = cardItem.textContent;

  openPopup(picturePopup);
}

// Крестик

closeButtons.forEach((item) => { 
  item.addEventListener("click", (event) => {
    popups.forEach(closePopup)
    }); 
}); 

// Добавление поста

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

// Слушатели

editButton.addEventListener("click", showProfilePopup);

profileForm.addEventListener("submit", profileFormSubmitHandler);  

addButton.addEventListener("click", showAddPopup);
