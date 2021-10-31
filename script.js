//Попап

const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const formElement = document.querySelector(".popup__form"); 
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__profile-description");

function showPopup() {
    popup.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

function closePopup() {
    popup.classList.remove("popup_opened");
}

//Сохранение

function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closePopup();
}

editButton.addEventListener("click", showPopup);

closeButton.addEventListener("click", closePopup);

formElement.addEventListener("submit", formSubmitHandler); 
