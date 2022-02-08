import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPicture = this._popup.querySelector('.popup__picture');
        this._popupDescription = this._popup.querySelector('.popup__picture-description');
    }

    open(place, link) {
        this._popupDescription.textContent = place;
        this._popupPicture.src = link;  
        this._popupPicture.alt = place;  
        super.open();
    }
}