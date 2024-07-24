export {createCard};

// @todo: Функция создания карточки
function createCard(userId, element, openModalDeleteCard, openPopupImg, addLike) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeConteiner = cardElement.querySelector('.card__like-button-number');
  const buttonDeleteCard = cardElement.querySelector('.card__delete-button');
 
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardElement.querySelector('.card__title').textContent = element.name;

  buttonDeleteCard.addEventListener('click', () => {openModalDeleteCard(element._id, cardElement);});
  cardImage.addEventListener('click', () => {openPopupImg(element)});
  likeButton.addEventListener('click', (evt) => addLike(evt, element._id, toggleLike));
  likeConteiner.textContent = element.likes['length'];//Отображение количества лайков карточки

  //убираем кнопку корзины для чужих карточек
  if(userId === element.owner._id) {
    buttonDeleteCard.classList.remove('card__delete-button_hidden');
  }
  else{
    buttonDeleteCard.classList.add('card__delete-button_hidden');
  }
  
  //проверяем стоит наш лайк на карточке или нет
   if (element.likes.some((like) => {like['_id'] === userId;})) {
    likeButton.classList.add('card__like-button_is-active');
  }

  //функция для изменения лайка
  const toggleLike = (cardElement) => {
    likeButton.classList.toggle('card__like-button_is-active'); 
    likeConteiner.textContent = cardElement.likes['length'];
  }

  return cardElement;
}

