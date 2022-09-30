export class UserInfo {
  constructor(data) {
    this._userName = document.querySelector(data.name);
    this._userAbout = document.querySelector(data.about);
    this._userAvatar = document.querySelector(data.avatar);
  }
  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      avatar: this._userAvatar.src,
    };
  }
  setUserInfo({ nameInput, aboutInput }) {
    this._userName.textContent = nameInput;
    this._userAbout.textContent = aboutInput;
  }
  setAvatarInfo(avatarInput) {
    this._userAvatar.src = avatarInput;
  }
}
