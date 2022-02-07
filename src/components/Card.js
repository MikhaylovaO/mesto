/*import {openPopup} from "../script.js"*/

export default class Card {
    constructor(data, cardSelector, {handleCardClick}) {
        this._link = data.link;
        this._place = data.place;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
      }

      _getTemplate() { 
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    } 

// Вешаем ивенты

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._toggleLikeButton);
    this._deleteButton.addEventListener('click', this._deleteCard);
    this._elementPicture.addEventListener("click", () => {
      this._handleCardClick(this._place, this._link);
    })
  };

  // Отдельные функции
  
  _toggleLikeButton = () => {
    this._likeButton.classList.toggle("element__like-button_active");
  }

  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".element__like-button");
    this._elementPicture = this._element.querySelector('.element__mask');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._element.querySelector('.element__element-name').textContent = this._place;
    this._elementPicture.src = this._link;
    this._elementPicture.alt = this._place;
    this._setEventListeners();
    return this._element;
  }

}
