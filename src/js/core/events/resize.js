import { bodyUnlock, debounce } from '../utils/functions.js';
import createHeroVideo from '../modules/heroVideo.js';

const $menu = document.querySelector('[data-menu]');
const $menuBtn = document.querySelector('[data-menu-btn]');

export function windowResize(e) {
	if (window.innerWidth >= 768) {
		$menu.classList.remove('js-open');
		$menuBtn.classList.remove('js-open');
	}
	if (!$menu.classList.contains('js-open')) {
		bodyUnlock();
	}
	createHeroVideo();
	windowResize = debounce(windowResize, 250);
}
