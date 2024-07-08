import './pages/index.css'; 
import {createCard, deleteCard, initialCards, addLike} from './components/cards';
import {openModal, closeModal, closeModalOverlay} from './components/modal';

const content = document.querySelector('.content');
const cardsConteiner = content.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');//кнопка открытия поп-ап профиль
const profileAddButton = document.querySelector('.profile__add-button');//кнопка +
const popupTypeEdit = document.querySelector('.popup_type_edit');//модальное окно профиля
const popupTypeNewCard = document.querySelector('.popup_type_new-card');//модальное окно добавления новой карточки
const popupTypeImage = document.querySelector('.popup_type_image');//модальное окно при клике на картинку

const formElement = document.forms['edit-profile'];//получение формы из попап редакт профиля
const nameInput = formElement.elements.name;//получение значение 1 инпут из формы редактирования профиля
const jobInput = formElement.elements.description;//получение значения 2 инпут из формы редактирования профиля
const profilTitle = document.querySelector('.profile__title');//поле имя на странице
const profilJob = document.querySelector('.profile__description');//поле род деятельности на странице

const formNewPlace = document.forms['new-place'];//получение формы из попап добавления картинки
const inputPlaceName = formNewPlace.elements['place-name'];//получение значение поля название из формы добавления картинки
const inputLink = formNewPlace.elements.link;//получение ссылки для картинки из формы добавления картинки

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
    const cardItem = createCard(element, deleteCard, openPopupImg, addLike);
    cardsConteiner.append(cardItem);
})

//открыть поп ап редактирование профиля
profileEditButton.addEventListener('click', () => {
    openModal(popupTypeEdit);
    nameInput.value = profilTitle.textContent;
    jobInput.value = profilJob.textContent;
})

//открыть поп ап добавления карточки
profileAddButton.addEventListener('click', () => {
    openModal(popupTypeNewCard);
})

//открыть картинку
//функция открытия модального окна с карточкой
function openPopupImg(item) {
    const popupImage = document.querySelector('.popup__image');//картинка из попап при нажатии на картинку
    const popupCaption = document.querySelector('.popup__caption');//текст из попап - подпись название картинки
      popupImage.src = item.link;
      popupImage.alt = item.name;
      popupCaption.textContent = item.name;
    openModal(popupTypeImage);
}
 
//закрытие поп ап по кпопке 
function clouseModalButton (popup) {
    const popupClose = popup.querySelector('.popup__close');//кнопка закрытия поп ап
    popupClose.addEventListener('click',() => {closeModal(popup)})
}

clouseModalButton(popupTypeEdit);
clouseModalButton(popupTypeNewCard);
clouseModalButton(popupTypeImage);

//вызов функции при закрытии по оверлей

closeModalOverlay(popupTypeEdit);
closeModalOverlay(popupTypeNewCard);
closeModalOverlay(popupTypeImage);

// Прикрепляем обработчик к форме:
//функция добавления информации профиля в pop-up
function handleFormSubmit(evt) {
    evt.preventDefault();
    profilTitle.textContent = nameInput.value;
    profilJob.textContent = jobInput.value;
    closeModal(popupTypeEdit);
}

formElement.addEventListener('submit', handleFormSubmit);

//добавление своей карточки на страницу
function addNewCard (evt) {
    evt.preventDefault();
    const newCard = createCard(
    {
        name: inputPlaceName.value,
        link: inputLink.value
    }, 
    deleteCard, 
    openPopupImg,
    addLike);
    cardsConteiner.prepend(newCard);
    formNewPlace.reset();
    closeModal(popupTypeNewCard);
}

formNewPlace.addEventListener('submit', addNewCard);

