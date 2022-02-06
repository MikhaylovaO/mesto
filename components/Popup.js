export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        this.setEventListeners();
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        this._removeEventListeners();
    }

    setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('click', this._handleOverlayClose);
        this._popupSelector.addEventListener('click', this._handleCloseButtonClick);
    }

    _removeEventListeners() {
        document.removeEventListener('keydown', this._handleEscClose);
        document.removeEventListener('click', this._handleOverlayClose);
        this._popupSelector.removeEventListener('click', this._handleCloseButtonClick);
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close()
        }
    }

    _handleOverlayClose = (evt) => {
        if (evt.target.classList.contains('popup__container')) {
          this.close();
        }
    }

    _handleCloseButtonClick = (evt) => {
        if(evt.target.classList.contains('popup__close-button')) {
            this.close();
        }
    }
}