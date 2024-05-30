const content = document.querySelector('.content');
const cardsConteiner = content.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createCard(element, deleteCard) {
    let cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__image').alt = element.name;
    cardElement.querySelector('.card__title').textContent = element.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
    const placesItem = evt.target.closest('.places__item');
    placesItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
    const cardItem = createCard(element, deleteCard);
    cardsConteiner.append(cardItem);
})
