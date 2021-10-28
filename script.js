//Попап
const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");

function showPopup() {
    popup.classList.add("popup_opened");
}

editButton.addEventListener("click", showPopup);

function closePopup() {
    popup.classList.remove("popup_opened");
}

closeButton.addEventListener("click", closePopup);

//Лайк

document.querySelectorAll(".element__like-button").forEach((item) => {
    item.addEventListener("click", (event) => {
        item.classList.toggle("element__like-button_active");
    });
});

//Сохранение

const submitButton = document.querySelector(".popup__submit-button");
let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__form-name");
let jobInput = document.querySelector(".popup__form-description");

function formSubmitHandler(evt) {
    evt.preventDefault();

    document.getElementById("name-inp").value;
    document.getElementById("desc-inp").value;

    let profileName = document.querySelector(".profile__name");
    let profileDescription = document.querySelector(".profile__profile-description");

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);

submitButton.addEventListener("click", formSubmitHandler);
