const valueFromPercent = (fullValue, percentValue) =>
	+Number((fullValue * percentValue) / 100).toFixed(2);

const videoWrapper = document.querySelector('#hero-video-wrapper');
const maskRects = document.querySelectorAll('.s-hero-rect-mask');

function createHeroVideo() {
	if (videoWrapper) {
		const svgMask = videoWrapper.querySelector('svg');
		const svgRects = videoWrapper.querySelectorAll('[data-hero-rect]');
		const wrapperWidth = videoWrapper.offsetWidth;
		let wrapperHeight = 412;
		if (window.innerWidth < 992) {
			wrapperHeight = 310;
		}
		if (window.innerWidth < 992) {
			wrapperHeight = 374;
		}

		svgMask.setAttribute('viewBox', `0 0 ${wrapperWidth} ${wrapperHeight}`);
		svgRects.forEach((r, idx, arr) => {
			const elDifference =
				valueFromPercent(wrapperWidth, 10.5) - valueFromPercent(wrapperWidth, 8.1);

			if (window.innerWidth > 992) {
				if (idx === 0 || idx === arr.length - 1) {
					r.setAttribute('width', valueFromPercent(wrapperWidth, 10.5) + 'px');
				} else {
					r.setAttribute('width', valueFromPercent(wrapperWidth, 8.1) + 'px');
				}

				if (idx === 1) {
					r.setAttribute(
						'x',
						(valueFromPercent(wrapperWidth, 10.5) + valueFromPercent(wrapperWidth, 0.6)) * idx +
							'px'
					);
				}

				if (idx > 1) {
					r.setAttribute(
						'x',
						(valueFromPercent(wrapperWidth, 8.1) + valueFromPercent(wrapperWidth, 0.6)) * idx +
							elDifference +
							'px'
					);
				}

				if (idx === 0) {
					r.setAttribute('x', '0');
				}

				if (idx === arr.length - 1) {
					r.setAttribute('x', wrapperWidth - valueFromPercent(wrapperWidth, 10.5) + 'px');
				}
			}
			if (window.innerWidth < 992) {
				r.setAttribute('width', valueFromPercent(wrapperWidth, 13.8) + 'px');
				if (idx === 0) {
					r.setAttribute('x', '0');
				}
				if (idx > 0 && idx < 6) {
					r.setAttribute(
						'x',
						(valueFromPercent(wrapperWidth, 13.8) + valueFromPercent(wrapperWidth, 0.55)) * idx +
							'px'
					);
				}
				if (idx === 6) {
					r.setAttribute('x', wrapperWidth - valueFromPercent(wrapperWidth, 13.8) + 'px');
				}
			}
			if (window.innerWidth < 480) {
				r.setAttribute('width', valueFromPercent(wrapperWidth, 32.48) + 'px');
				if (idx === 0) {
					r.setAttribute('x', '0');
				}
				if (idx > 0 && idx < 3) {
					r.setAttribute(
						'x',
						(valueFromPercent(wrapperWidth, 32.48) + valueFromPercent(wrapperWidth, 0.85)) * idx +
							'px'
					);
				}
				if (idx === 3) {
					r.setAttribute('x', wrapperWidth - valueFromPercent(wrapperWidth, 32.48) + 'px');
				}
			}
		});
	}
}

import { popup } from '../modules/popup.js';

export const heroVideoHover = (x, y) => {
	const wrapperWidth = videoWrapper.offsetWidth;
	const wrapperHeight = 412;
	const xPercent = +Number((x * 100) / wrapperWidth / 100).toFixed(2);
	const yPercent = +Number((y * 100) / wrapperHeight / 100).toFixed(2);
	console.log('xPercent', xPercent);
	console.log('yPercent', yPercent);
	if (xPercent < 0.1 || xPercent > 0.9 || yPercent < 0.1 || yPercent > 0.9) {
		videoWrapper.classList.add('reset');
	} else {
		videoWrapper.classList.remove('reset');
	}
	maskRects[0]?.style.setProperty('--scale-y', xPercent < 0.5 ? xPercent + 0.5 : xPercent);
	maskRects[1]?.style.setProperty('--scale-y', xPercent < 0.5 ? xPercent + 0.5 : xPercent);
	maskRects[2]?.style.setProperty('--scale-y', xPercent < 0.5 ? xPercent + 0.5 : xPercent);
	maskRects[3]?.style.setProperty('--scale-y', xPercent < 0.5 ? xPercent + 0.5 : xPercent);
	maskRects[4]?.style.setProperty('--scale-y', xPercent < 0.5 ? xPercent + 0.5 : xPercent);
	maskRects[5]?.style.setProperty('--scale-y', xPercent < 0.5 ? xPercent + 0.5 : xPercent);
	maskRects[6]?.style.setProperty('--scale-y', xPercent < 0.5 ? xPercent + 0.5 : xPercent);
	maskRects[7]?.style.setProperty('--scale-y', xPercent < 0.5 ? xPercent + 0.5 : xPercent);
	maskRects[8]?.style.setProperty('--scale-y', xPercent < 0.5 ? xPercent + 0.5 : xPercent);
	maskRects[9]?.style.setProperty('--scale-y', xPercent < 0.5 ? xPercent + 0.5 : xPercent);
	maskRects[10]?.style.setProperty('--scale-y', xPercent < 0.5 ? xPercent + 0.5 : xPercent);
};

export default createHeroVideo;
