export {
    getDataUsers, 
    getInitialCards, 
    pushDataUser, 
    addNewCardFromServer, 
    deleteCardServer, 
    likeCard,
    unlikeCard,
    pushAvatar
}

const tokenNumber = '481223fe-f449-4667-b318-586394f8c52a';
const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
     // если ошибка, отклоняем промис
     return Promise.reject(`Ошибка: ${res.status}`);
    
};

//загрузка информации о пользователе с сервера
const getDataUsers = () => {
    return fetch ('https://nomoreparties.co/v1/wff-cohort-18/users/me', {
        method: 'GET',
        headers: {
            authorization: tokenNumber
        }
    })
    .then(handleResponse)
    .catch((err)=> {
        console.log(`Ошибка: ${err.status}`);
    });
}

//Загрузка карточек с сервера
const getInitialCards = () => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-18/cards', {
        method: 'GET',
        headers: {
            authorization: tokenNumber
        }
    })
    .then(handleResponse)
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    });
}

//Редактирование профиля
const pushDataUser = (name, about) => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-18/users/me', { 
        method: 'PATCH',
        headers: {
           authorization: tokenNumber,
           'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({name, about})
    })
    .then(handleResponse)
    .catch((err) => {console.log(err);})
}

//Обновление аватара пользователя
const pushAvatar = (avatar) => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-18/users/me/avatar', { 
        method: 'PATCH',
        headers: {
           authorization: tokenNumber,
           'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({avatar})
    })
    .then(handleResponse)
    .catch((err) => {console.log(err);})
}

//Добавление новой карточки
const  addNewCardFromServer = (name, link) => {
    return fetch ('https://nomoreparties.co/v1/wff-cohort-18/cards', {
        method: 'POST',
        headers: {
            authorization: tokenNumber,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, link})
    })
    .then(handleResponse)
    .catch((err) => {console.log(err);})
}

//Удаление карточки
const deleteCardServer = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-18/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: tokenNumber,
            'Content-Type': 'application/json'
        }
    })
    .then(handleResponse)
    .catch((err) => {console.log(err);})
}

//Постановка лайка
const likeCard = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-18/cards/likes/${cardId}`, {
        method: 'PUT',
        headers:{
            authorization: tokenNumber,
            'Content-Type': 'application/json'
        }
    })
    .then(handleResponse)
    .catch((err) => {console.log(err);})
}

//снятие лайка
const unlikeCard = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-18/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers:{
            authorization: tokenNumber,
            'Content-Type': 'application/json'
        }
    })
    .then(handleResponse)
    .catch((err) => {console.log(err);})
}