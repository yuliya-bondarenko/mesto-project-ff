import './pages/index.css'; 
import {createCard} from './components/card';
import {openModal, closeModal, addCloseModalOverlayListener} from './components/modal';
import {enableValidation, clearValidation, validationObject} from './components/validation';
import {getDataUsers, getInitialCards, pushDataUser, addNewCardFromServer, deleteCardServer, likeCard, unlikeCard, pushAvatar} from './components/api';

const content = document.querySelector('.content');
const cardsConteiner = content.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');//кнопка открытия поп-ап профиль
const profileAddButton = document.querySelector('.profile__add-button');//кнопка +
const popupTypeEdit = document.querySelector('.popup_type_edit');//модальное окно профиля
const popupTypeNewCard = document.querySelector('.popup_type_new-card');//модальное окно добавления новой карточки
const popupTypeImage = document.querySelector('.popup_type_image');//модальное окно при клике на картинку
const popupImage = document.querySelector('.popup__image');//картинка из попап при нажатии на картинку
const popupCaption = document.querySelector('.popup__caption');//текст из попап - подпись название картинки

const formElementProfile = document.forms['edit-profile'];//получение формы из попап редакт профиля
const nameInput = formElementProfile.elements.name;//получение значение 1 инпут из формы редактирования профиля
const jobInput = formElementProfile.elements.description;//получение значения 2 инпут из формы редактирования профиля
const profilTitle = document.querySelector('.profile__title');//поле имя на странице
const profilJob = document.querySelector('.profile__description');//поле род деятельности на странице
const profilAvatar = document.querySelector('.profile__image');

const formNewPlace = document.forms['new-place'];//получение формы из попап добавления картинки
const inputPlaceName = formNewPlace.elements['place-name'];//получение значение поля название из формы добавления картинки
const inputLink = formNewPlace.elements.link;//получение ссылки для картинки из формы добавления картинки

let userId;
let deleteCardId;
let deleteElement;

const popupYes = document.querySelector('.popup_type_yes');
const formSubmitYes = document.forms['submit-yes'];

const popupAvatar = document.querySelector('.popup_type_avatar');
const formAvatar = document.forms['new-avatar'];
const inputAvatarLink = formAvatar.elements.avatar;
const profileImageContainer = document.querySelector('.profile__image-container');

//открыть поп ап редактирование профиля
profileEditButton.addEventListener('click', () => {
    openModal(popupTypeEdit);
    clearValidation(formElementProfile, validationObject);
    nameInput.value = profilTitle.textContent;
    jobInput.value = profilJob.textContent;
})

//открыть поп ап добавления карточки
profileAddButton.addEventListener('click', () => {
    openModal(popupTypeNewCard);
    clearValidation(formNewPlace, validationObject);
})

//открыть картинку
//функция открытия модального окна с карточкой
function openPopupImg(item) {
      popupImage.src = item.link;
      popupImage.alt = item.name;
      popupCaption.textContent = item.name;
    openModal(popupTypeImage);
}
 
//закрытие поп ап по кпопке 
function addCloseModalButtonListener (popup) {
    const popupClose = popup.querySelector('.popup__close');//кнопка закрытия поп ап
    popupClose.addEventListener('click',() => {closeModal(popup)})
}

addCloseModalButtonListener(popupTypeEdit);
addCloseModalButtonListener(popupTypeNewCard);
addCloseModalButtonListener(popupTypeImage);
addCloseModalButtonListener(popupYes);
addCloseModalButtonListener(popupAvatar);

//вызов функции при закрытии по оверлей

addCloseModalOverlayListener(popupTypeEdit);
addCloseModalOverlayListener(popupTypeNewCard);
addCloseModalOverlayListener(popupTypeImage);
addCloseModalOverlayListener(popupYes);
addCloseModalOverlayListener(popupAvatar);


//функция добавления информации профиля в pop-up через сервер
function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    const nameUser = nameInput.value;
    const aboutUser = jobInput.value;
    const formButton = formElementProfile.querySelector('.popup__button');
    const textButton = formButton.textContent;
    formButton.textContent = 'Сохранение...';

    pushDataUser(nameUser, aboutUser)
    .then((newData) => {
        profilTitle.textContent = newData.name;
        profilJob.textContent = newData.about;
        profilAvatar.src = newData.avatar;
        closeModal(popupTypeEdit);
    })
    .catch((err)=> {
        console.log(`Ошибка: ${err.status}`);
    })
    .finally(formButton.textContent = textButton)
}

// Прикрепляем обработчик к форме:
formElementProfile.addEventListener('submit', handleFormSubmitProfile);

//добавление своей карточки на страницу через сервер
function addNewCard (evt) {
    evt.preventDefault();
    const cardObj = {};
    cardObj.name = inputPlaceName.value;
    cardObj.link = inputLink.value;
    const formButton = formNewPlace.querySelector('.popup__button');
    const textButton = formButton.textContent;
    formButton.textContent = 'Сохранение...';
    
    addNewCardFromServer(cardObj.name, cardObj.link)
    .then((newImg) => {
        const userId = newImg.owner['_id'];
        const newCard = createCard(
            userId,
            newImg, 
            openModalDeleteCard, 
            openPopupImg,
            addLike
        );
        cardsConteiner.prepend(newCard);
        formNewPlace.reset();
        closeModal(popupTypeNewCard);
    })
    .catch((err)=> {
        console.log(`Ошибка: ${err.status}`);
    })
    .finally(formButton.textContent = textButton)  
}

formNewPlace.addEventListener('submit', addNewCard);

//вызов функции добавления обработчиков всем формам
enableValidation(validationObject);

//Загрузка карточек с сервера,загрузка информации о пользователе с сервера
// @todo: Вывести карточки на страницу
// Передаём массив с промисами методу Promise.all
Promise.all([getDataUsers(), getInitialCards()])
    .then(([userData, cards]) => {
        userId = userData['_id'];
        cards.forEach((card) => {
            const newCard = createCard(userId, card, openModalDeleteCard, openPopupImg, addLike);
            cardsConteiner.append(newCard);
        })
        profilTitle.textContent = userData.name;
        profilJob.textContent = userData.about;
        profilAvatar.src = userData.avatar;
    })
    .catch((err)=> {
        console.log(`Ошибка: ${err.status}`);
})

//Удаление карточки
const openModalDeleteCard = (cardId, card) => {
    deleteCardId = cardId; 
    deleteElement = card;
    openModal(popupYes);
}

//слушатель на форму по кнопке ок
formSubmitYes.addEventListener('submit', submitDeleteCard);

function submitDeleteCard(evt) {
    evt.preventDefault();
    deleteCardServer(deleteCardId)
    .then(() => {
        deleteElement.remove();
        deleteElement = null;
    })
    .catch((err)=> {
        console.log(`Ошибка: ${err.status}`);
    })
    .finally(() => closeModal(popupYes))
}

//фунция постановки лайк
const addLike = (evt, cardId, toggleLike) => {
    const likeButton = evt.target;
    if (likeButton.classList.contains('card__like-button_is-active')) {
        unlikeCard(cardId)
        .then((card) => {
            toggleLike(card);
        })
        .catch((err)=> {
            console.log(`Ошибка: ${err.status}`);
        })
    }
    else {
        likeCard(cardId)
        .then((card) => {
            toggleLike(card);
        })
        .catch((err)=> {
            console.log(`Ошибка: ${err.status}`);
        })
    }
}


//открыть попап редактирование профиля
profileImageContainer.addEventListener('click',() => openModal(popupAvatar));

//Обновление аватара пользователя
const avatarSubmit = (evt) => {
    evt.preventDefault();
    const avatarUser = inputAvatarLink.value;
    const formButton = formAvatar.querySelector('.popup__button');
    const textButton = formButton.textContent;
    formButton.textContent = 'Сохранение...';
    
    pushAvatar(avatarUser)
    .then((dataAvatar) => {
        profilAvatar.src = dataAvatar.avatar;
        closeModal(popupAvatar);
    })
    .catch((err)=> {
        console.log(`Ошибка: ${err.status}`);
    })
    .finally(formButton.textContent = textButton)
}

formAvatar.addEventListener('submit', avatarSubmit);