// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
// Вспомогательные функции
import {
	_slideUp,
	_slideDown,
	_slideToggle,
	setPhoneMask,
	setFileInputs
} from '../utils/functions.js';
// Модуль попапа
import { popup } from '../modules/popup.js';
// Модуль прокрутки к блоку
// import { gotoBlock } from "../scroll/gotoblock.js";
//==============================================================================================================================================================================================================================================================================================================================

/*
Чтобы поле участвовало в валидации добавляем атрибут data-required
Особые проверки:
data-required="email" - вадидация E-mail

Чтобы поле валидировалось при потере фокуса, 
к атрибуту data-required добавляем атрибут data-validate
*/

// Работа с полями формы. Добавление классов, работа с placeholder
export function formFieldsInit() {
	const formFields = document.querySelectorAll('input[placeholder],textarea[placeholder]');

	//setPhoneMask();
	//formViewpass();
	//setDateMask();
	//setFloatLabels();
	setFileInputs();

	if (formFields.length) {
		formFields.forEach((formField) => {
			formField.dataset.placeholder = formField.placeholder;
		});
	}
	document.body.addEventListener('focusin', function (e) {
		const targetElement = e.target;
		if (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA') {
			if (targetElement.dataset.placeholder) {
				targetElement.placeholder = '';
			}
			targetElement.classList.add('_focus');
			targetElement.parentElement.classList.add('_focus');

			formValidate.removeError(targetElement);
		}

		setPhoneMask();
	});
	document.body.addEventListener('focusout', function (e) {
		const targetElement = e.target;
		if (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA') {
			if (targetElement.dataset.placeholder) {
				targetElement.placeholder = targetElement.dataset.placeholder;
			}
			targetElement.classList.remove('_focus');
			targetElement.parentElement.classList.remove('_focus');

			// Моментальная валидация
			if (targetElement.hasAttribute('data-validate')) {
				formValidate.validateInput(targetElement);
			}
		}
	});
}
// Валидация форм
export let formValidate = {
	getErrors(form) {
		let error = 0;
		let formRequiredItems = form.querySelectorAll('*[data-required]');
		if (formRequiredItems.length) {
			formRequiredItems.forEach((formRequiredItem) => {
				if (formRequiredItem.offsetParent !== null) {
					error += this.validateInput(formRequiredItem);
				}
				if (formRequiredItem.parentElement.classList.contains('select')) {
					if (formRequiredItem.parentElement.offsetParent !== null) {
						error += this.validateInput(formRequiredItem);
					}
				}
			});
		}
		return error;
	},
	validateInput(formRequiredItem) {
		let error = 0;
		if (formRequiredItem.dataset.required === 'email') {
			formRequiredItem.value = formRequiredItem.value.replace(' ', '');
			if (this.emailTest(formRequiredItem)) {
				if (!formRequiredItem.value) {
					this.addError(formRequiredItem);
				} else {
					this.addUncorrectError(formRequiredItem);
				}
				error++;
			} else {
				this.removeError(formRequiredItem);
			}
		} else if (formRequiredItem.type === 'checkbox' && !formRequiredItem.checked) {
			this.addError(formRequiredItem);
			error++;
		} else if (formRequiredItem.dataset.required === 'select') {
			let selectDefault =
				formRequiredItem.nextElementSibling.querySelector('.select__option[hidden]');

			if (+selectDefault.dataset.value === 1) {
				this.addError(formRequiredItem);
				error++;
			} else {
				this.removeError(formRequiredItem);
			}
		} else if (formRequiredItem.dataset.required === 'password') {
			formRequiredItem.value = formRequiredItem.value.replace(' ', '');

			const id = formRequiredItem.dataset.passwordget;
			const initialPassword = document.querySelector(`*[data-passwordset='${id}']`);

			if (!formRequiredItem.value) {
				this.addError(formRequiredItem);
				error++;
			} else if (this.passwordTest(formRequiredItem)) {
				this.addPasswordError(formRequiredItem);
				error++;
			} else if (id) {
				if (formRequiredItem.value !== initialPassword.value) {
					this.addConfirmPasswordError(formRequiredItem);
					error++;
				}
			} else {
				this.removeError(formRequiredItem);
			}
		} else {
			if (!formRequiredItem.value) {
				this.addError(formRequiredItem);
				error++;
			} else {
				this.removeError(formRequiredItem);
			}
		}
		return error;
	},
	addError(formRequiredItem) {
		formRequiredItem.classList.add('_error');
		formRequiredItem.parentElement.classList.add('_error');
		let inputError = formRequiredItem.parentElement.querySelector('.form__error');
		if (inputError) formRequiredItem.parentElement.removeChild(inputError);
		if (validationUnfillError && formRequiredItem.type !== 'checkbox') {
			formRequiredItem.parentElement.insertAdjacentHTML(
				'beforeend',
				'<div class="form__error">' + validationUnfillError + '</div>'
			);
		}
	},
	addUncorrectError(formRequiredItem) {
		formRequiredItem.classList.add('_error');
		formRequiredItem.parentElement.classList.add('_error');
		let inputError = formRequiredItem.parentElement.querySelector('.form__error');
		if (inputError) formRequiredItem.parentElement.removeChild(inputError);
		if (validationUncorrectError) {
			formRequiredItem.parentElement.insertAdjacentHTML(
				'beforeend',
				'<div class="form__error">' + validationUncorrectError + '</div>'
			);
		}
	},
	addPasswordError(formRequiredItem) {
		formRequiredItem.classList.add('_error');
		formRequiredItem.parentElement.classList.add('_error');
		let inputError = formRequiredItem.parentElement.querySelector('.form__error');
		if (inputError) formRequiredItem.parentElement.removeChild(inputError);
		if (validationShortPassError) {
			formRequiredItem.parentElement.insertAdjacentHTML(
				'beforeend',
				'<div class="form__error">' + validationShortPassError + '</div>'
			);
		}
	},
	addConfirmPasswordError(formRequiredItem) {
		formRequiredItem.classList.add('_error');
		formRequiredItem.parentElement.classList.add('_error');
		let inputError = formRequiredItem.parentElement.querySelector('.form__error');
		if (inputError) formRequiredItem.parentElement.removeChild(inputError);
		if (validationUncorrectError) {
			formRequiredItem.parentElement.insertAdjacentHTML(
				'beforeend',
				'<div class="form__error">' + validationConfirmPassError + '</div>'
			);
		}
	},
	removeError(formRequiredItem) {
		formRequiredItem.classList.remove('_error');
		formRequiredItem.parentElement.classList.remove('_error');
		if (formRequiredItem.parentElement.querySelector('.form__error')) {
			formRequiredItem.parentElement.removeChild(
				formRequiredItem.parentElement.querySelector('.form__error')
			);
		}
	},
	formClean(form) {
		let inputs = form.querySelectorAll('input,textarea');
		for (let index = 0; index < inputs.length; index++) {
			const el = inputs[index];
			el.parentElement.classList.remove('_focus');
			el.classList.remove('_focus');
			el.value = ''; // el.dataset.placeholder
		}
		let checkboxes = form.querySelectorAll('.checkbox__input');
		if (checkboxes.length > 0) {
			for (let index = 0; index < checkboxes.length; index++) {
				const checkbox = checkboxes[index];
				//checkbox.checked = false;
				if (checkbox.hasAttribute('value')) {
					checkbox.removeAttribute('value');
				}
			}
		}
		let selects = form.querySelectorAll('select');
		if (selects.length > 0) {
			for (let index = 0; index < selects.length; index++) {
				const select = selects[index];
				const select_default_value = select.getAttribute('data-default');
				select.value = select_default_value;
				select_item(select);
			}
		}
		// float label
		let floatLabels = form.querySelectorAll('.content-name');
		if (floatLabels.length > 0) {
			for (let index = 0; index < floatLabels.length; index++) {
				const label = floatLabels[index];
				label.classList.remove('_active');
			}
		}
		// file input
		let fileInputs = form.querySelectorAll('.file__input');
		let previewFileText = form.querySelectorAll('.message-text');
		if (fileInputs.length > 0) {
			for (let index = 0; index < fileInputs.length; index++) {
				const fileInput = fileInputs[index];
				fileInput.classList.remove('full');
			}
			for (let index = 0; index < previewFileText.length; index++) {
				const text = previewFileText[index];
				text.innerText = fileInputs[0].getAttribute('data-placeholder') || '';
			}
		}
	},
	emailTest(formRequiredItem) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
	},
	passwordTest(formRequiredItem) {
		if (formRequiredItem.value.length < 8) {
			return true;
		} else {
			return false;
		}
	}
};
/* Отправка форм */
export function formSubmit(validate) {
	const forms = document.forms;
	if (forms.length) {
		for (const form of forms) {
			form.addEventListener('submit', formSubmit);
		}
	}
	async function formSubmit(e) {
		const form = e.target;
		const error = validate ? formValidate.getErrors(form) : 0;
		if (error === 0) {
			const message = form.getAttribute('data-message');
			const successMessage = form.getAttribute('data-success');
			const ajax = form.hasAttribute('data-ajax');
			//SendForm
			if (ajax) {
				e.preventDefault();
				const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
				const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
				const formData = new FormData(form);

				form.classList.add('_sending');
				const response = await fetch(formAction, {
					method: formMethod,
					body: formData
				});
				if (response.ok) {
					let responseResult = await response.json();
					form.classList.remove('_sending');
					if (message) {
						// Нужно подключить зависимость
						popup.open(`${message}`);
					}
					formValidate.formClean(form);
				} else {
					alert('Ошибка');
					form.classList.remove('_sending');
				}
			}
			// If test
			if (form.hasAttribute('data-test')) {
				e.preventDefault();
				if (message) {
					// Нужно подключить зависимость
					popup.open(`${message}`);
				}
				if (successMessage) {
					form.querySelector('button').textContent = successMessage;
					form.classList.add('form-success');
				}
				formValidate.formClean(form);
			}
		} else {
			const formError = form.querySelector('._error');
			if (formError && form.hasAttribute('data-goto-error')) {
				// Нужно подключить зависимость
				gotoBlock(formError, 1000, 50);
			}
			e.preventDefault();
		}
	}
}
/* Модуь формы "показать пароль" */
export function formViewpass() {
	document.addEventListener('click', function (e) {
		let targetElement = e.target;
		if (targetElement.closest('[class*="__viewpass"]')) {
			let inputType = targetElement.classList.contains('active') ? 'password' : 'text';
			targetElement.parentElement.querySelector('input').setAttribute('type', inputType);
			targetElement.classList.toggle('active');
		}
	});
}
/* Модуь формы "колличество" */
export function formQuantity() {
	document.addEventListener('click', function (e) {
		let targetElement = e.target;
		if (targetElement.closest('.quantity__button')) {
			let value = parseInt(targetElement.closest('.quantity').querySelector('input').value);
			if (targetElement.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				--value;
				if (value < 1) value = 1;
			}
			targetElement.closest('.quantity').querySelector('input').value = value;
		}
	});
}
/* Модуь звездного рейтинга */
export function formRating() {
	const ratings = document.querySelectorAll('.rating');
	if (ratings.length > 0) {
		initRatings();
	}
	// Основная функция
	function initRatings() {
		let ratingActive, ratingValue;
		// "Бегаем" по всем рейтингам на странице
		for (let index = 0; index < ratings.length; index++) {
			const rating = ratings[index];
			initRating(rating);
		}
		// Инициализируем конкретный рейтинг
		function initRating(rating) {
			initRatingVars(rating);

			setRatingActiveWidth();

			if (rating.classList.contains('rating_set')) {
				setRating(rating);
			}
		}
		// Инициализайция переменных
		function initRatingVars(rating) {
			ratingActive = rating.querySelector('.rating__active');
			ratingValue = rating.querySelector('.rating__value');
		}
		// Изменяем ширину активных звезд
		function setRatingActiveWidth(index = ratingValue.innerHTML) {
			const ratingActiveWidth = index / 0.05;
			ratingActive.style.width = `${ratingActiveWidth}%`;
		}
		// Возможность указать оценку
		function setRating(rating) {
			const ratingItems = rating.querySelectorAll('.rating__item');
			for (let index = 0; index < ratingItems.length; index++) {
				const ratingItem = ratingItems[index];
				ratingItem.addEventListener('mouseenter', function (e) {
					// Обновление переменных
					initRatingVars(rating);
					// Обновление активных звезд
					setRatingActiveWidth(ratingItem.value);
				});
				ratingItem.addEventListener('mouseleave', function (e) {
					// Обновление активных звезд
					setRatingActiveWidth();
				});
				ratingItem.addEventListener('click', function (e) {
					// Обновление переменных
					initRatingVars(rating);

					if (rating.dataset.ajax) {
						// "Отправить" на сервер
						setRatingValue(ratingItem.value, rating);
					} else {
						// Отобразить указанную оцнку
						ratingValue.innerHTML = index + 1;
						setRatingActiveWidth();
					}
				});
			}
		}
		async function setRatingValue(value, rating) {
			if (!rating.classList.contains('rating_sending')) {
				rating.classList.add('rating_sending');

				// Отправика данных (value) на сервер
				let response = await fetch('rating.json', {
					method: 'GET'

					//body: JSON.stringify({
					//	userRating: value
					//}),
					//headers: {
					//	'content-type': 'application/json'
					//}
				});
				if (response.ok) {
					const result = await response.json();

					// Получаем новый рейтинг
					const newRating = result.newRating;

					// Вывод нового среднего результата
					ratingValue.innerHTML = newRating;

					// Обновление активных звезд
					setRatingActiveWidth();

					rating.classList.remove('rating_sending');
				} else {
					alert('Ошибка');

					rating.classList.remove('rating_sending');
				}
			}
		}
	}
}
export function formPricerange() {
	const priceSlider = document.querySelector('.price-filter');
	if (priceSlider) {
		noUiSlider.create(priceSlider, {
			start: [1500, 15500],
			connect: true,
			tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
			range: {
				min: [1500],
				max: [15500]
			}
		});

		// const priceStart = document.getElementById('price-start');
		// const priceEnd = document.getElementById('price-end');
		// priceStart.addEventListener('change', setPriceValues);
		// priceEnd.addEventListener('change', setPriceValues);

		// function setPriceValues() {
		// 	let priceStartValue;
		// 	let priceEndValue;
		// 	if (priceStart.value != '') {
		// 		priceStartValue = priceStart.value;
		// 	}
		// 	if (priceEnd.value != '') {
		// 		priceEndValue = priceEnd.value;
		// 	}
		// 	priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
		// }
	}
}
