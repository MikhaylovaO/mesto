import Popup from './Popup.js';

export default class PopupWithDelete extends Popup {
 constructor(popupSelector, {handleSubmitCallback}) {
        super(popupSelector);
        this._handleSubmitCallback = handleSubmitCallback;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector('.popup__button');
    }

      toggleButtonText(text) {
        this._submitButton.textContent = text;
      }

      setSubmitAction(action) {
        this._handleSubmitCallback = action;
      }

      _setEventListeners() {
        this._popupForm.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._handleSubmitCallback();
        });
        super._setEventListeners();
      }
}