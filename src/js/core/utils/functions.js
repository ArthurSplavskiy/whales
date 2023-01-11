/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
export function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src =
			'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}
/* Проверка мобильного браузера */
export let isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows()
		);
	}
};
/* Добавление класса touch для HTML если браузер мобильный */
export function addTouchClass() {
	// Добавление класса _touch для HTML если браузер мобильный
	if (isMobile.any()) document.documentElement.classList.add('touch');
}
// Добавление loaded для HTML после полной загрузки страницы
export function addLoadedClass() {
	window.addEventListener('load', function () {
		setTimeout(function () {
			document.documentElement.classList.add('loaded');
		}, 0);
	});
}
// Получение хеша в адресе сайта
export function getHash() {
	if (location.hash) {
		return location.hash.replace('#', '');
	}
}
// Указание хеша в адресе сайта
export function setHash(hash) {
	history.pushState('', '', hash);
}
// Учет плавающей панели на мобильных устройствах при 100vh
export function fullVHfix() {
	const fullScreens = document.querySelectorAll('[data-fullscreen]');
	if (fullScreens.length && isMobile.any()) {
		window.addEventListener('resize', fixHeight);
		function fixHeight() {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}
		fixHeight();
	}
}
//==== Вспомогательные модули плавного расскрытия и закрытия объекта ======================================================================================================================================================================
// export let _slideUp = (target, duration = 500) => {
// 	if (!target.classList.contains('_slide')) {
// 		target.classList.add('_slide');
// 		target.style.transitionProperty = 'height, margin, padding';
// 		target.style.transitionDuration = duration + 'ms';
// 		target.style.height = target.offsetHeight + 'px';
// 		target.offsetHeight;
// 		target.style.overflow = 'hidden';
// 		target.style.height = 0;
// 		target.style.paddingTop = 0;
// 		target.style.paddingBottom = 0;
// 		target.style.marginTop = 0;
// 		target.style.marginBottom = 0;
// 		window.setTimeout(() => {
// 			target.hidden = true;
// 			target.style.removeProperty('height');
// 			target.style.removeProperty('padding-top');
// 			target.style.removeProperty('padding-bottom');
// 			target.style.removeProperty('margin-top');
// 			target.style.removeProperty('margin-bottom');
// 			target.style.removeProperty('overflow');
// 			target.style.removeProperty('transition-duration');
// 			target.style.removeProperty('transition-property');
// 			target.classList.remove('_slide');
// 		}, duration);
// 	}
// }
// export let _slideDown = (target, duration = 500) => {
// 	if (!target.classList.contains('_slide')) {
// 		target.classList.add('_slide');
// 		if (target.hidden) {
// 			target.hidden = false;
// 		}
// 		let height = target.offsetHeight;
// 		target.style.overflow = 'hidden';
// 		target.style.height = 0;
// 		target.style.paddingTop = 0;
// 		target.style.paddingBottom = 0;
// 		target.style.marginTop = 0;
// 		target.style.marginBottom = 0;
// 		target.offsetHeight;
// 		target.style.transitionProperty = "height, margin, padding";
// 		target.style.transitionDuration = duration + 'ms';
// 		target.style.height = height + 'px';
// 		target.style.removeProperty('padding-top');
// 		target.style.removeProperty('padding-bottom');
// 		target.style.removeProperty('margin-top');
// 		target.style.removeProperty('margin-bottom');
// 		window.setTimeout(() => {
// 			target.style.removeProperty('height');
// 			target.style.removeProperty('overflow');
// 			target.style.removeProperty('transition-duration');
// 			target.style.removeProperty('transition-property');
// 			target.classList.remove('_slide');
// 		}, duration);
// 	}
// }
// export let _slideToggle = (target, duration = 500) => {
// 	if (target.hidden) {
// 		return _slideDown(target, duration);
// 	} else {
// 		return _slideUp(target, duration);
// 	}
// }
// SlideToggle ========================================================================================
export let _slideUp = (target, duration = 500) => {
	domElement(target, changeState);

	function changeState(target) {
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.style.display = 'none';
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
};
export let _slideDown = (target, duration = 500) => {
	domElement(target, changeState);

	function changeState(target) {
		target.style.removeProperty('display');
		let display = window.getComputedStyle(target).display;
		if (display === 'none') display = 'block';

		target.style.display = display;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
};
export let _slideToggle = (target, duration = 500) => {
	domElement(target, changeState);

	function changeState(slide) {
		if (!slide.classList.contains('_slide')) {
			slide.classList.add('_slide');
			if (window.getComputedStyle(slide).display === 'none') {
				return _slideDown(slide, duration);
			} else {
				return _slideUp(slide, duration);
			}
		}
	}
};
//==== Вспомогательные модули блокировки прокрутки и скочка ====================================================================================================================================================================================================================================================================================
export let bodyLockStatus = true;
export let bodyLockToggle = (delay = 500) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
};
export let bodyUnlock = (delay = 500) => {
	let body = document.querySelector('body');
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll('._lp');
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove('lock');
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
};
export let bodyLock = (delay = 500) => {
	let body = document.querySelector('body');
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll('._lp');
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight =
				window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight =
			window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		document.documentElement.classList.add('lock');

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
};
//==== Модуь работы со спойлерами =======================================================================================================================================================================================================================
/*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.

Например: 
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/
export function spollers() {
	const spollersArray = document.querySelectorAll('[data-spollers]');
	if (spollersArray.length > 0) {
		// Получение обычных слойлеров
		const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
			return !item.dataset.spollers.split(',')[0];
		});
		// Инициализация обычных слойлеров
		if (spollersRegular.length > 0) {
			initSpollers(spollersRegular);
		}
		// Получение слойлеров с медиа запросами
		const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
			return item.dataset.spollers.split(',')[0];
		});
		// Инициализация слойлеров с медиа запросами
		if (spollersMedia.length > 0) {
			const breakpointsArray = [];
			spollersMedia.forEach((item) => {
				const params = item.dataset.spollers;
				const breakpoint = {};
				const paramsArray = params.split(',');
				breakpoint.value = paramsArray[0];
				breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
				breakpoint.item = item;
				breakpointsArray.push(breakpoint);
			});
			// Получаем уникальные брейкпоинты
			let mediaQueries = breakpointsArray.map(function (item) {
				return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type;
			});
			mediaQueries = mediaQueries.filter(function (item, index, self) {
				return self.indexOf(item) === index;
			});
			// Работаем с каждым брейкпоинтом
			mediaQueries.forEach((breakpoint) => {
				const paramsArray = breakpoint.split(',');
				const mediaBreakpoint = paramsArray[1];
				const mediaType = paramsArray[2];
				const matchMedia = window.matchMedia(paramsArray[0]);
				// Объекты с нужными условиями
				const spollersArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true;
					}
				});
				// Событие
				matchMedia.addEventListener('change', function () {
					initSpollers(spollersArray, matchMedia);
				});
				initSpollers(spollersArray, matchMedia);
			});
		}
		// Инициализация
		function initSpollers(spollersArray, matchMedia = false) {
			spollersArray.forEach((spollersBlock) => {
				spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
				if (matchMedia.matches || !matchMedia) {
					spollersBlock.classList.add('_spoller-init');
					initSpollerBody(spollersBlock);
					spollersBlock.addEventListener('click', setSpollerAction);
				} else {
					spollersBlock.classList.remove('_spoller-init');
					initSpollerBody(spollersBlock, false);
					spollersBlock.removeEventListener('click', setSpollerAction);
				}
			});
		}
		// Работа с контентом
		function initSpollerBody(spollersBlock, hideSpollerBody = true) {
			const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
			if (spollerTitles.length > 0) {
				spollerTitles.forEach((spollerTitle) => {
					if (hideSpollerBody) {
						spollerTitle.removeAttribute('tabindex');
						if (!spollerTitle.classList.contains('_spoller-active')) {
							spollerTitle.nextElementSibling.hidden = true;
						}
					} else {
						spollerTitle.setAttribute('tabindex', '-1');
						spollerTitle.nextElementSibling.hidden = false;
					}
				});
			}
		}
		function setSpollerAction(e) {
			const el = e.target;
			if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
				const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
				const spollersBlock = spollerTitle.closest('[data-spollers]');
				const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
				if (!spollersBlock.querySelectorAll('._slide').length) {
					if (oneSpoller && !spollerTitle.classList.contains('_spoller-active')) {
						hideSpollersBody(spollersBlock);
					}
					spollerTitle.classList.toggle('_spoller-active');
					_slideToggle(
						spollerTitle.nextElementSibling,
						spollersBlock.dataset.duration ? spollersBlock.dataset.duration : 0
					);
				}
				//e.preventDefault();
			}
		}
		function hideSpollersBody(spollersBlock) {
			const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._spoller-active');
			if (spollerActiveTitle) {
				spollerActiveTitle.classList.remove('_spoller-active');
				_slideUp(
					spollerActiveTitle.nextElementSibling,
					spollersBlock.dataset.duration ? spollersBlock.dataset.duration : 0
				);
			}
		}
	}
}
//==== Модуь работы с табами =======================================================================================================================================================================================================================
/*
Для родителя табов пишем атрибут data-tabs
Для родителя заголовков табов пишем атрибут data-tabs-titles
Для родителя блоков табов пишем атрибут data-tabs-body

Если нужно чтобы табы открывались с анимацией 
добавляем к data-tabs data-tabs-animate
По умолчанию, скорость анимации 500ms, 
указать свою скорость можно так: data-tabs-animate="1000"

Если нужно чтобы табы превращались в "спойлеры" на неком размере экранов пишем параметры ширины.
Например: data-tabs="992" - табы будут превращаться в спойлеры на экранах меньше или равно 992px
*/
export function tabs() {
	const tabs = document.querySelectorAll('[data-tabs]');
	//let tabsActiveHash = [];

	if (tabs.length > 0) {
		// const hash = location.hash.replace('#', '');
		// if (hash.startsWith('tab-')) {
		// 	tabsActiveHash = hash.replace('tab-', '').split('-');
		// }
		tabs.forEach((tabsBlock, index) => {
			tabsBlock.classList.add('_tab-init');
			tabsBlock.setAttribute('data-tabs-index', index);
			tabsBlock.addEventListener('click', setTabsAction);
			initTabs(tabsBlock);
		});

		// Получение табов с медиа запросами
		const tabsMedia = Array.from(tabs).filter(function (item, index, self) {
			return item.dataset.tabs;
		});
		// Инициализация табов с медиа запросами
		if (tabsMedia.length > 0) {
			initMediaTabs(tabsMedia);
		}
	}
	// Инициализация табов с медиа запросами
	function initMediaTabs(tabsMedia) {
		const breakpointsArray = [];
		tabsMedia.forEach((item) => {
			const breakpointValue = item.dataset.tabs;

			const tabsBreakpointsObject = {};
			tabsBreakpointsObject.value = breakpointValue;
			tabsBreakpointsObject.item = item;

			breakpointsArray.push(tabsBreakpointsObject);
		});

		// Получаем уникальные брейкпоинты
		let mediaQueries = breakpointsArray.map(function (item) {
			return `(max-width:${item.value}px),${item.value}`;
		});
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});

		// Работаем с каждым брейкпоинтом
		mediaQueries.forEach((breakpoint) => {
			const paramsArray = breakpoint.split(',');
			const matchMedia = window.matchMedia(paramsArray[0]);
			const mediaBreakpoint = paramsArray[1];

			// Объекты с нужными условиями
			const tabsMediaArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint) {
					return true;
				}
			});

			// Событие
			matchMedia.addEventListener('change', function () {
				setTitlePosition(tabsMediaArray, matchMedia);
			});
			setTitlePosition(tabsMediaArray, matchMedia);
		});
	}
	// Установка позиций заголовков
	function setTitlePosition(tabsMediaArray, matchMedia) {
		tabsMediaArray.forEach((tabsMediaItem) => {
			tabsMediaItem = tabsMediaItem.item;
			const tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
			const tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
			const tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
			const tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
			tabsContentItems.forEach((tabsContentItem, index) => {
				if (matchMedia.matches) {
					tabsContent.append(tabsTitleItems[index]);
					tabsContent.append(tabsContentItem);
					tabsMediaItem.classList.add('_tab-spoller');
				} else {
					tabsTitles.append(tabsTitleItems[index]);
					tabsMediaItem.classList.remove('_tab-spoller');
				}
			});
		});
	}
	// Работа с контентом
	function initTabs(tabsBlock) {
		const tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
		const tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
		//const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

		// if (tabsActiveHashBlock) {
		// 	const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
		// 	tabsActiveTitle.classList.remove('_tab-active');
		// }
		if (tabsContent.length > 0) {
			tabsContent.forEach((tabsContentItem, index) => {
				tabsTitles[index].setAttribute('data-tabs-title', '');
				tabsContentItem.setAttribute('data-tabs-item', '');

				// if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
				// 	tabsTitles[index].classList.add('_tab-active');
				// }
				tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
			});
		}
	}
	function setTabsStatus(tabsBlock) {
		const tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
		const tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex;

		function isTabsAnamate(tabsBlock) {
			if (tabsBlock.hasAttribute('data-tabs-animate')) {
				return tabsBlock.dataset.tabsAnimate > 0 ? tabsBlock.dataset.tabsAnimate : 500;
			}
		}
		const tabsBlockAnimate = isTabsAnamate(tabsBlock);

		if (tabsContent.length > 0) {
			tabsContent.forEach((tabsContentItem, index) => {
				if (tabsTitles[index].classList.contains('_tab-active')) {
					if (tabsBlockAnimate) {
						_slideDown(tabsContentItem, tabsBlockAnimate);
					} else {
						tabsContentItem.hidden = false;
						tabsContentItem.classList.add('_active');
					}
					//location.hash = `tab-${tabsBlockIndex}-${index}`;
				} else {
					if (tabsBlockAnimate) {
						_slideUp(tabsContentItem, tabsBlockAnimate);
					} else {
						tabsContentItem.hidden = true;
						tabsContentItem.classList.remove('_active');
					}
				}
			});
		}
	}
	function setTabsAction(e) {
		const el = e.target;
		if (el.closest('[data-tabs-title]') || el.hasAttribute('[data-tabs-title]')) {
			const tabTitle = el;
			const tabsBlock = tabTitle.closest('[data-tabs]');
			if (
				!tabTitle.classList.contains('_tab-active') &&
				!tabsBlock.querySelectorAll('._slide').length
			) {
				const tabActiveTitle = tabsBlock.querySelector('[data-tabs-title]._tab-active');
				if (tabActiveTitle) {
					tabActiveTitle.classList.remove('_tab-active');
				}

				tabTitle.classList.add('_tab-active');
				setTabsStatus(tabsBlock);
			}
			e.preventDefault();
		}
	}
}
// Модуль "показать еще" (в работе) =======================================================================================================================================================================================================================

/*
Документация по работе в шаблоне:
Документация плагина:
Сниппет (HTML): 
*/
export function showMore() {}
//================================================================================================================================================================================================================================================================================================================
// Прочие полезные функции ================================================================================================================================================================================================================================================================================================================
//================================================================================================================================================================================================================================================================================================================

// Получить цифры из строки
export function getDigFromString(item) {
	return parseInt(item.replace(/[^\d]/g, ''));
}
// Форматирование цифр типа 100 000 000
export function getDigFormat(item) {
	return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}
// Уникализация массива
export function uniqArray(array) {
	return array.filter(function (item, index, self) {
		return self.indexOf(item) === index;
	});
}

export function setPhoneMask() {
	const phoneInputs = document.querySelectorAll('input[data-phone-mask]');

	if (phoneInputs) {
		phoneInputs.forEach((phoneInput) => {
			if (phoneInput) {
				//'+7(999) 999 9999'
				//'+38(999) 999 9999'
				//'+375(99)999-99-99'
				phoneInput.classList.add('_mask');
				Inputmask('+380 999 999 999', {
					showMaskOnHover: false,
					clearIncomplete: true,
					clearMaskOnLostFocus: true,
					onincomplete: function () {
						phoneInput.inputmask.remove();
						phoneInput.value = '';
					}
				}).mask(phoneInput);

				phoneInput.addEventListener('blur', () => {
					phoneInput.placeholder = '';
				});
			}
		});
	}
}

export function setDateMask() {
	const phoneInputs = document.querySelectorAll('input[data-date-mask]');

	if (phoneInputs) {
		phoneInputs.forEach((dateInput) => {
			if (dateInput) {
				datepicker(dateInput, {
					customDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
					customMonths: [
						'Янв',
						'Фев',
						'Мар',
						'Апр',
						'Май',
						'Июн',
						'Июл',
						'Авг',
						'Сен',
						'Окт',
						'Ноя',
						'Дек'
					],
					formatter: (input, date, instance) => {
						const value = date.toLocaleDateString();
						input.value = value;
					},
					onSelect: function (input, instance, date) {
						input_focus_add(input.el);
					}
				});
			}
		});
	}
}
//============================================================================================================================

// Tabs ===============================================================================================
export function tabsAdaptive() {
	let tabs = document.querySelectorAll('._tabs');
	for (let index = 0; index < tabs.length; index++) {
		let tab = tabs[index];
		let tabs_items = tab.querySelectorAll('._tabs-item');
		let tabs_blocks = tab.querySelectorAll('._tabs-block');
		for (let index = 0; index < tabs_items.length; index++) {
			let tabs_item = tabs_items[index];
			tabs_item.addEventListener('click', function (e) {
				for (let index = 0; index < tabs_items.length; index++) {
					let tabs_item = tabs_items[index];
					tabs_item.classList.remove('_active');
					tabs_blocks[index].classList.remove('_active');
				}
				tabs_item.classList.add('_active');
				tabs_blocks[index].classList.add('_active');
				e.preventDefault();
			});
		}
	}

	const matchMedia = window.matchMedia('(max-width: 768px)');

	matchMedia.addListener(function () {
		init(matchMedia);
	});
	init(matchMedia);

	function init(matchMedia = false) {
		if (matchMedia.matches || !matchMedia) {
			tabsMobileBody();
		}
	}

	function tabsMobileBody() {
		let tabsMobile = document.querySelectorAll('._tabs-mobile');
		for (let index = 0; index < tabsMobile.length; index++) {
			let tab = tabsMobile[index];
			let value = tab.querySelector('.tabs-mobile__value');
			let tabs_items = tab.querySelectorAll('._tabs-item');
			let item_active = tab.querySelector('._tabs-item._active');
			let tabs_nav = tab.querySelector('.tabs-block__nav');
			value.innerHTML = item_active.innerHTML;

			value.addEventListener('click', () => {
				value.classList.toggle('_active');
				_slideToggle(tabs_nav);
			});

			for (let index = 0; index < tabs_items.length; index++) {
				let tabs_item = tabs_items[index];

				const clickHandler = () => {
					let item_active = tab.querySelector('._tabs-item._active');
					value.innerHTML = item_active.innerHTML;
					if (matchMedia.matches || !matchMedia) {
						_slideUp(tabs_nav);
					}
				};

				tabs_item.addEventListener('click', clickHandler);
			}
		}
	}
}
// ====================================================================================================

// FLOAT FORM LABEL ===================================================================================
export function setFloatLabels() {
	const floatLabels = document.querySelectorAll('[data-float-label]');

	const init = (el) => {
		floatLabels.forEach((label) => {
			const element = label.querySelector(`${el}`);
			const contentName = label.querySelector('.content-name');

			if (element && element.value) {
				contentName.classList.add('_active');
			}

			if (element) {
				element.addEventListener('focus', () => {
					contentName.classList.add('_active');
				});
				element.addEventListener('blur', () => {
					if (!element.value) {
						contentName.classList.remove('_active');
					} else {
						contentName.classList.add('_active');
					}
				});
			}
		});
	};

	init('input');
	init('textarea');
}
// ====================================================================================================

// INPUT TYPE FILE ===================================================================================
export function setFileInputs() {
	const fileInputs = document.querySelectorAll('[data-input-file]');

	if (fileInputs.length > 0) {
		for (let i = 0; i < fileInputs.length; i++) {
			const fileInputContainer = fileInputs[i];
			const inputFile = fileInputContainer.querySelector('input');
			const fileButton = fileInputContainer.querySelector('.icon-pin');
			const filePreview = fileInputContainer.querySelector('.message-text');
			const maxSizeError = inputFile.getAttribute('data-error-max-size');
			const placeholder = inputFile.getAttribute('data-placeholder');
			filePreview.innerHTML = placeholder;

			// remove file preview
			fileButton.onclick = () => {
				if (inputFile.classList.contains('full')) {
					inputFile.classList.remove('full');
					inputFile.value = '';
					filePreview.innerHTML = placeholder;
				}
			};

			inputFile.addEventListener('change', () => {
				//form_remove_error(inputFile);
				uploadFile(inputFile.files[0]);
			});

			function uploadFile(file) {
				if (!['application/pdf', 'image/png', 'application/msword'].includes(file.type)) {
					//form_add_error(inputFile)
					inputFile.value = '';
					return;
				}

				// проверим размер файла (<2 Мб)
				if (file.size > 2 * 1024 * 1024) {
					//form_add_error(inputFile)
					fileInputContainer.querySelector('.form__error').innerHTML = maxSizeError;
					inputFile.value = '';
					return;
				}

				inputFile.classList.add('full');
				filePreview.innerHTML = file.name;
			}
		}
	}
}
// ====================================================================================================

export function isTarget(eventTarget, target) {
	let $target;
	if (typeof target === 'string') {
		$target = document.querySelector(target);
	}
	if ($target === eventTarget) {
		return $target;
	} else if (eventTarget.closest(target)) {
		return eventTarget.closest(target);
	} else {
		return false;
	}
}

export function removeClasses(array, className) {
	let $array;
	if (typeof array === 'string') {
		$array = document.querySelectorAll(array);
	} else {
		$array = array;
	}
	for (var i = 0; i < $array.length; i++) {
		$array[i].classList.remove(className);
	}
}

export function domElement(target, callback) {
	if (target instanceof NodeList) {
		target.forEach((el) => callback(el));
	} else if (target instanceof Array) {
		Array.from(target).forEach((el) => callback(el));
	} else if (typeof target === 'string') {
		const $target = document.querySelectorAll(target);

		if ($target instanceof NodeList) {
			$target.forEach((el) => callback(el));
		} else {
			callback($target);
		}
	} else {
		callback(target);
	}
}

export function debounce(func, delay) {
	let clearTimer;
	return function () {
		const context = this;
		const args = arguments;
		clearTimeout(clearTimer);
		clearTimer = setTimeout(() => func.apply(context, args), delay);
	};
}

export function addLottieAnimation(domElement = '', path = '', loopStatus = false, play = true) {
	const animation = bodymovin.loadAnimation({
		container: document.querySelector(`${domElement}`),
		path: `${path}`,
		renderer: 'svg',
		loop: loopStatus,
		autoplay: play
	});
}
