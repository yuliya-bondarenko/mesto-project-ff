export {openModal, closeModal, closeModalOverlay}

//функция открытия pop-up
function openModal(element) {
    element.classList.add('popup_is-opened');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeModalEsc);
}

//функция закрытия pop-up
function closeModal(element) {
    element.classList.remove('popup_is-opened');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', closeModalEsc);
}

//закрытие по оверлей
function closeModalOverlay (popup) {
    popup.addEventListener('click', function(evt) {
        if ( evt.target.classList.contains('popup')) {
            closeModal(popup);
        }
    })
}

//закрытие по Esc
function closeModalEsc (evt) {
    if (evt.key === 'Escape') {
        const popUp = document.querySelector('.popup_is-opened');
        closeModal(popUp);
    }
}




