export default class UserInfo {
    constructor({nameElement, jobElement}) {
        this._nameElement = nameElement;
        this._jobElement = jobElement;
    }

    getUserInfo() {
        this._userData = {};
        this._userData.name = this._nameElement.textContent;
        this._userData.job = this._jobElement.textContent;
        return this._userData;
    }

    setUserInfo(name,job) {
        this._nameElement.textContent = name;
        this._jobElement.textContent = job;
    }
}