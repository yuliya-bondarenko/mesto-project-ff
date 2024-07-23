//import {likeCard, unlikeCard} from "./api";

export {createCard};

// @todo: Функция создания карточки
function createCard(userId, element, handleDeleteCard, openPopupImg, addLike) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeConteiner = cardElement.querySelector('.card__like-button-number');
  const ButtonDeleteCard = cardElement.querySelector('.card__delete-button');
  //console.log(userId);
 
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardElement.querySelector('.card__title').textContent = element.name;

   //проверяем стоит наш лайк на карточке или нет
  if (element.likes.some((like) => {like['_id'] === userId})) {
    likeButton.classList.add('card__like-button_is-active');
  }

  ButtonDeleteCard.addEventListener('click', () => {handleDeleteCard(element._id, cardElement);});
  cardImage.addEventListener('click', () => {openPopupImg(element)});
  likeButton.addEventListener('click', (evt) => addLike(evt, element._id, likeConteiner));
  likeConteiner.textContent = element.likes['length'];//Отображение количества лайков карточки

 

  //убираем кнопку корзины для чужих карточек
  if(userId === element.owner._id) {
    ButtonDeleteCard.classList.remove('card__delete-button_hidden');
  }
  else{
    ButtonDeleteCard.classList.add('card__delete-button_hidden');
  }

  return cardElement;
}


