export {createCard, deleteCard, initialCards, addLike}

// @todo: Функция создания карточки
function createCard(element, deleteCard, openPopupImg, addLike) {
  const cardTemplate = document.querySelector('#card-template').content;
  let cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');
 
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.name;
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);

  cardElement.querySelector('.card__image').addEventListener('click', () => {openPopupImg(element)});

  likeButton.addEventListener('click', addLike);

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const placesItem = evt.target.closest('.places__item');
  placesItem.remove();
}

//фунция лайк
function addLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];