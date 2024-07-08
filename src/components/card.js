export {createCard, deleteCard, addLike};

// @todo: Функция создания карточки
function createCard(element, deleteCard, openPopupImg, addLike) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
 
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);

  cardImage.addEventListener('click', () => {openPopupImg(element)});

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