const $heroVideo = document.querySelector('.s-hero-video video');
const $heroVideoPopup = document.querySelector('#popup-video video');

export const popup = {
	open(selector) {
		document.querySelector('.popup._open')?.classList.remove('_open');
		document.documentElement.classList.add('popup-open');
		document.querySelector(selector)?.classList.add('_open');
	},
	close(e, selector) {
		e.target.closest(selector).closest('.popup').classList.remove('_open');
		document.documentElement.classList.remove('popup-open');
		if (e.target.closest(selector).closest('#popup-video')) {
			$heroVideo.play();
			$heroVideoPopup.pause();
		}
	}
};
