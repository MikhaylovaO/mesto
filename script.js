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
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;

    openPopup(profilePopup);
};

//Попап добавления

function showAddPopup() {
  openPopup(addPopup);
};

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

editButton.addEventListener("click", showProfilePopup);

formElement.addEventListener("submit", profileFormSubmitHandler); 

addButton.addEventListener("click", showAddPopup);