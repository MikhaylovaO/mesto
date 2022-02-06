import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {formSubmitHandler}) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
        this._popupForm = this._popupSelector.querySelector('.popup__form');

    }

    _getInputValues() {   
        this._inputsList = this._popupSelector.querySelectorAll('.popup__input');
        this._inputValues = {};
        this._inputsList.forEach((input) => {
          inputValues[input.name] = input.value;
        });
        return inputValues;
      }

      setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', this._formSubmitHandler);
      }

      _formSubmitHandler = (evt) => {
          evt.preventDefault();
          this._formSubmit(this._getInputValues());
      }

      close() {
        super.close();
        this._popupForm.removeEventListener('submit', this._formSubmitHandler);
        this._popupForm.reset();
      }

}