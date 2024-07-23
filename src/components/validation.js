export {enableValidation, clearValidation, validationObject}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const validationObject = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    errorSelector: '.popup__input-error',
    inputErrorClass: 'popup__input_type_error',
    inputActiveClass: 'popup__input-error_active',
    buttonCloseClass: '.popup__close'
}); 

//функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, validationObject) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(validationObject.inputErrorClass);
    errorElement.textContent = errorMessage;//содержимое span
    errorElement.classList.add(validationObject.inputActiveClass);//показываем сообщение об ошибке
}

//функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(validationObject.inputErrorClass);
    errorElement.textContent = '';//очистим ошибку
    errorElement.classList.remove(validationObject.inputActiveClass);//удаляем сообщение об ошибке
}

//функция, которая проверяет валидность поля 
const isValid = (formElement, inputElement) => {
  if(inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
  else {
    inputElement.setCustomValidity('');
  }

  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationObject);
  }
  else {
    hideInputError(formElement, inputElement, validationObject);
  }
}

//навешиваем слушатель на каждый инпут внутри формы
function setEventListeners(formElement, validationObject) {
    const InputList = Array.from(formElement.querySelectorAll(validationObject.inputSelector));
    const buttonElement = formElement.querySelector(validationObject.submitButtonSelector);
    toggleButtonState(InputList, buttonElement, validationObject);//Это проверит состояние кнопки при первой загрузке страницы. Тогда кнопка перестанет быть активной до ввода данных в одно из полей.
    InputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            toggleButtonState(InputList, buttonElement, validationObject);//Такой вызов проверит состояние кнопки при каждом изменении символа в любом из полей.
            isValid(formElement, inputElement);
        })
    })
}

//Добавление обработчиков всем формам
function enableValidation(validationObject) {
    const formList = Array.from(document.querySelectorAll(validationObject.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => evt.preventDefault())
        setEventListeners(formElement, validationObject);
        clearValidation(formElement, validationObject);
    })
}

//обхлодим массив полей и ищем хоть одно поле, которое не прошло валидацию
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

//функция, которая отвечает за блокировку кнопки сохранить
function toggleButtonState(inputList, buttonElement, validationObject) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationObject.inactiveButtonClass);
    }
    else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationObject.inactiveButtonClass);
    }
}

//функция очищает ошибки валидации и делает форму неактивной
function clearValidation(formElement, validationObject) {
    const formErrors = Array.from(formElement.querySelectorAll(validationObject.errorSelector));
    const buttonElements = Array.from(document.querySelectorAll(validationObject.buttonCloseClass));
    const inputElements = Array.from(formElement.querySelectorAll(validationObject.inputSelector));
    formErrors.forEach((errorElement) => {
        errorElement.classList.remove(validationObject.inputActiveClass);
    })
    buttonElements.forEach((buttonElement) => {
        buttonElement.addEventListener('click', formElement.reset());
    })
    inputElements.forEach((inputElement) => {
        inputElement.classList.remove(validationObject.inputErrorClass);
    })
}