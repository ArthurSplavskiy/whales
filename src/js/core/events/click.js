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
import Cookies from 'js-cookie';

const $pageMenu = document.querySelector('[data-menu]');
const $pageMenuBtn = document.querySelector('[data-menu-btn]');
const $heroVideo = document.querySelector('.s-hero-video video');
const $heroVideoPopup = document.querySelector('#popup-video video');

export const documentClick = (e) => {
	const targetElement = e.target;

	if (targetElement.closest('[data-anchor]')) {
		location.hash = e.target.dataset.anchor;
	}

	const $videoPopupBtn = functions.isTarget(targetElement, '[data-popup-open="#popup-video"]');
	if ($videoPopupBtn) {
		$heroVideo.pause();
		$heroVideoPopup.play();
		popup.open('#popup-video');
		if (bodyLockStatus) {
			bodyLockToggle();
		}
	}

	const $callbackPopupBtn = functions.isTarget(
		targetElement,
		'[data-popup-open="#popup-callback"]'
	);
	if ($callbackPopupBtn) {
		popup.open('#popup-callback');
		if (bodyLockStatus) {
			bodyLockToggle();
		}
	}

	if (targetElement.closest('[data-allow-cookie]')) {
		Cookies.set('allow-cookie', true);
	}

	if (targetElement.closest('.popup-close')) {
		popup.close(e, '.popup-close');
		if (bodyLockStatus) {
			bodyUnlock();
		}
	}
	if (
		targetElement.closest('.popup') &&
		!targetElement.closest('.popup-content') &&
		!targetElement.closest('#popup-cookie')
	) {
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
