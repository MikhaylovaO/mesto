export default class FormValidator {
    constructor(form, config) {
      this._config = config;
      this._formSelector = config.formSelector;
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorMessageClass = config.errorMessageClass;
      this._form = form;
      this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector)); 
      this._submitButton = this._form.querySelector(this._submitButtonSelector); 
    }

    _showError(input, errorMessageText) {
        const errorMessage = this._form.querySelector(`#${input.id}-error`);
        errorMessage.textContent = errorMessageText;
        errorMessage.classList.add(this._errorMessageClass);
        input.classList.add(this._inputErrorClass);
    }
    
    _hideError(input) {
        const errorMessage = this._form.querySelector(`#${input.id}-error`);
        errorMessage.textContent = '';
        errorMessage.classList.remove(this._errorMessageClass);
        input.classList.remove(this._inputErrorClass);
    }
    
    _hasInvalidInput() {
        return this._inputs.some((input) => {
            return !input.validity.valid;
        });
    }

    enableSubmitButton() {
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.disabled = false;
    }

    disableSubmitButton() {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disabled = true;
    }

    _toggleButtonError() {
       if (this._hasInvalidInput()) {
        this.disableSubmitButton();
        } else {
        this.enableSubmitButton();
        }
    } 
    
    _checkIfInputValid(input) {
        if (!input.validity.valid) {
        this._showError(input, input.validationMessage);
        } else {
        this._hideError(input);
        }
    }
    
    resetErrors() {
        this._inputs.forEach((input) => {
            this._hideError(input);
        });
    }

    _setInputListeners() {
        this._inputs.forEach((input) => {
        input.addEventListener('input', () => {
            this._checkIfInputValid(input);
            this._toggleButtonError();
        });
        });
    }

    enableValidation() {
        this._setInputListeners();
    }
}
