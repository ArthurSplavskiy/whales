import * as functions from './core/utils/functions.js';
import * as forms from './core/forms/forms.js';
import { documentClick } from './core/events/click.js';
import { documentKeyDown } from './core/events/keydown.js';
import { windowResize } from './core/events/resize.js';
import { windowMousemove } from './core/events/mouseMove.js';
import createHeroVideo from './core/modules/heroVideo.js';
//import { mouseMoveHandler, mouseEnterHandler, mouseLeaveHandler } from './core/modules/cursor.js';
import { createScrollTriggerDesktop } from './core/modules/createScrollTrigger.js';
import { createStickyNav } from './core/modules/createStickyNav.js';
import { createActiveUrlLinks } from './core/modules/createActiveUrlLinks.js';
import { createParallax } from './core/modules/createParallax.js';
import Cookies from 'js-cookie';
import './core/modules/animation.js';
import './core/modules/sliders.js';
import './core/modules/hoverTabs.js';
import './core/forms/select.js';
import '../scss/style.scss';
import { windowMouseover } from './core/events/historyListMouseOver.js';

const init = () => {
	const $html = document.documentElement;
	const $heroVideoWrapper = document.querySelector('#hero-video-wrapper');
	const $historyList = document.querySelector('.s-history-list');
	$html.classList.add('loaded');

	if (Cookies.get('allow-cookie')) {
		document.querySelector('#popup-cookie')?.classList.remove('_open');
	}

	forms.formFieldsInit();
	forms.formSubmit(true);
	functions.setPhoneMask();
	functions.spollers();
	functions.tabs();

	createHeroVideo();
	createStickyNav();
	createScrollTriggerDesktop();
	createActiveUrlLinks();
	createParallax();

	functions.addLottieAnimation('[data-lottie="bubble-1"]', 'others/lottie/bubble.json', true);
	functions.addLottieAnimation('[data-lottie="bubble-2"]', 'others/lottie/bubble.json', true);
	functions.addLottieAnimation('[data-lottie="bubble-3"]', 'others/lottie/bubble.json', true);
	functions.addLottieAnimation('[data-lottie="bubble-4"]', 'others/lottie/bubble.json', true);

	document.addEventListener('click', documentClick);
	document.addEventListener('keydown', documentKeyDown);
	window.addEventListener('resize', windowResize);
	// window.addEventListener('mousemove', mouseMoveHandler);
	// window.addEventListener('mouseenter', mouseEnterHandler);
	// window.addEventListener('mouseleave', mouseLeaveHandler);
	$heroVideoWrapper && $heroVideoWrapper.addEventListener('mousemove', windowMousemove);
	$historyList && $historyList.addEventListener('mouseover', windowMouseover);
};

window.addEventListener('load', init);
