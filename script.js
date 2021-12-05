const profilePopup =document.querySelector(".popup__content_type_profile");
const addPopup = document.querySelector(".popup__content_type_add-picture");
const picturePopup = document.querySelector(".popup__content_type_picture")
const editButton = document.querySelector(".profile__edit-button");
const formElement = document.querySelector(".popup__form"); 
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const picName = document.querySelector(".popup__input_type_pic-name");
const picLink = document.querySelector(".popup__input_type_link");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__profile-description");
const addButton = document.querySelector(".profile__add-button");
const cardName = document.querySelector('.popup__input_type_pic-name');
const cardLink = document.querySelector('.popup__input_type_link');
const formPicElement = document.querySelector('.popup__form_type_create');

//Попап профиль

function showProfilePopup() {
    profilePopup.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
};

//Попап добавления

function showAddPopup() {
  addPopup.classList.add("popup_opened");
};

//Крестик попапа

document.querySelectorAll(".popup__close-button").forEach((item) => {
  item.addEventListener("click", (event) => {
    document.querySelectorAll(".popup").forEach((item) => {
      item.classList.remove("popup_opened");
    });
   });
});

//Кнопка закрытия сохранить/создать

document.querySelectorAll(".popup__button").forEach((item) => {
  item.addEventListener("click", (event) => {
    document.querySelectorAll(".popup").forEach((item) => {
      item.classList.remove("popup_opened");
    });
   });
});

//Сохранение профиля

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}

editButton.addEventListener("click", showProfilePopup);

formElement.addEventListener("submit", formSubmitHandler); 

addButton.addEventListener("click", showAddPopup);


//Постоянные карточки

const cardsContainer = document.querySelector('.elements');

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

const cardsOnline = document.querySelector('.elements');

function getCard(el) {
  const cardTemplate = document.querySelector('#cardTemplate').content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardPicture = cardElement.querySelector('.element__mask');
  cardElement.querySelector('.element__element-name').textContent = el.place;
  cardPicture.src = el.link;
  cardPicture.alt = el.place;

  cardPicture.addEventListener('click', handleImgClick);
  
  return cardElement;
}


function render() {
  const htmlCard = initialCards.map((el) => {
    return getCard(el);
  });
  cardsOnline.append(...htmlCard);
}

render();


// Добавление карточки

function createNewPost(cardName, cardLink) {
  const cardTemplate = document.querySelector('#cardTemplate').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const likeButton = cardElement.querySelector(".element__like-button");
  const elementPicture = cardElement.querySelector('.element__mask');
  const deleteButton = cardElement.querySelector('.element__delete-button');

  cardElement.querySelector('.element__element-name').textContent = cardName;
  cardElement.querySelector('.element__mask').src = cardLink;

  elementPicture.addEventListener("click", handleImgClick);

  likeButton.addEventListener("click", (event) => {
    likeButton.classList.toggle("element__like-button_active");
  });

  deleteButton.addEventListener("click", (event) => {
    event.target.parentElement.remove();
  });

  cardsContainer.prepend(cardElement);
}

formPicElement.addEventListener("submit", function(evt) {
  evt.preventDefault();
  const place = document.querySelector('.popup__input_type_pic-name');
  const link = document.querySelector('.popup__input_type_link');

  createNewPost(place.value, link.value);

  place.value = cardName.value;
  link.value = cardLink.value;
});


// Попап-картинка

function handleImgClick (event) {
  const eventTarget = event.target;
  const cardItem = eventTarget.closest('.element');
  const popupPicture = document.querySelector('.popup__picture');
  const popupDescription = document.querySelector('.popup__picture-description');
  popupDescription.textContent = cardItem.textContent;
  popupPicture.src = cardItem.querySelector('.element__mask').src;
  popupPicture.alt = cardItem.textContent;

  picturePopup.classList.add("popup_opened");
}

//Лайк

document.querySelectorAll(".element__like-button").forEach((element) => {
  element.addEventListener("click", (event) => {
    element.classList.toggle("element__like-button_active");
  });
});

//Удаление

document.querySelectorAll(".element__delete-button").forEach((element) => {
  element.addEventListener("click", (event) => {
    event.target.parentElement.remove() ;
  });
});

