import * as functions from '../utils/functions.js';
import { popup } from '../modules/popup.js';
import {
	_slideUp,
	_slideDown,
	bodyLockStatus,
	bodyLockToggle,
	bodyUnlock,
	removeClasses
} from '../utils/functions.js';

const $popupCV = document.querySelector('#popup-cv');
const $pageMenu = document.querySelector('[data-menu]');
const $pageMenuBtn = document.querySelector('[data-menu-btn]');

export const documentClick = (e) => {
	const targetElement = e.target;

	// POPUP ===================
	const $popupTriggerOpen = functions.isTarget(targetElement, '[data-popup-open="cv"]');
	if ($popupTriggerOpen) {
		$popupCV && popup.open('#popup-cv');
		if (bodyLockStatus) {
			bodyLockToggle();
		}
	}

	const $videoPopupBtn = functions.isTarget(targetElement, '[data-popup-open="#popup-video"]');
	if ($videoPopupBtn) {
		popup.open('#popup-video');
		if (bodyLockStatus) {
			bodyLockToggle();
		}
	}

	if (targetElement.closest('.popup-close')) {
		popup.close(e, '.popup-close');
		if (bodyLockStatus) {
			bodyUnlock();
		}
	}
	if (targetElement.closest('.popup') && !targetElement.closest('.popup-content')) {
		popup.close(e, '.popup');
		if (bodyLockStatus) {
			bodyUnlock();
		}
	}
	// ===================

	// MENU BUTTON ===================
	const $menuBtn = functions.isTarget(targetElement, '[data-menu-btn]');
	if ($menuBtn && $pageMenu) {
		if (bodyLockStatus) {
			bodyLockToggle();
			$pageMenuBtn.classList.toggle('js-open');
			$pageMenu.classList.toggle('js-open');
		}
	}

	const $menuAnchors = functions.isTarget(targetElement, '.menu [data-anchor]');

	if ($menuAnchors && $pageMenu && window.innerWidth < 768) {
		if (bodyLockStatus) {
			bodyLockToggle();
			$pageMenuBtn.classList.toggle('js-open');
			$pageMenu.classList.toggle('js-open');
		}
	}

	const $targetHeaderSpoller = functions.isTarget(targetElement, '.header [data-spoller]');
	if (!$targetHeaderSpoller) {
		removeClasses('.header [data-spoller]', '_spoller-active');
		_slideUp('.header [data-spoller] + *', 500);
	}

	const $targetFooterSpoller = functions.isTarget(targetElement, '.footer [data-spoller]');
	if (!$targetFooterSpoller) {
		removeClasses('.footer [data-spoller]', '_spoller-active');
		_slideUp('.footer [data-spoller] + *', 500);
	}
	// ===================
};
