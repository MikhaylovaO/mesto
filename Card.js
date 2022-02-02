export default class Card {
    constructor(data, cardSelector) {
        this._link = data.link;
        this._place = data.place;
        this._cardSelector = cardSelector;
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
    this._elementPicture.addEventListener("click", this._handleImgClick);
  };

  // Отдельные функции
  
  _toggleLikeButton(evt) {
    evt.target.classList.toggle("element__like-button_active");
  }

  _deleteCard(event) {
    event.target.parentElement.remove(); 
  }

  _handleImgClick (data) { 
    this._popupPicture = document.querySelector('.popup__picture');
    this._popupDescription = document.querySelector('.popup__picture-description');
    this._picturePopup = document.querySelector(".popup_type_popup-picture");

    const eventTarget = data.target; 
    const cardItem = eventTarget.closest('.element'); 
  
    this._popupDescription.textContent = cardItem.textContent;
    this._popupPicture.src = cardItem.querySelector('.element__mask').src; 
    this._popupPicture.alt = cardItem.textContent; 
  
    this._picturePopup.classList.add("popup_opened");  
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
