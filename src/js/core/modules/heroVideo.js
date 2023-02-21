const valueFromPercent = (fullValue, percentValue) =>
	+Number((fullValue * percentValue) / 100).toFixed(2);

const videoWrapper = document.querySelector('#hero-video-wrapper');
const maskRects = document.querySelectorAll('.s-hero-rect-mask');

function createHeroVideo() {
	if (videoWrapper) {
		const svgMask = videoWrapper.querySelector('svg');
		const svgRects = videoWrapper.querySelectorAll('[data-hero-rect]');
		const svgCraft = document.querySelectorAll('[data-craft-rect]');
		const wrapperWidth = videoWrapper.offsetWidth;
		let wrapperHeight = 412;
		if (window.innerWidth < 992) {
			wrapperHeight = 374;
		}

		svgMask.setAttribute('viewBox', `0 0 ${wrapperWidth} ${wrapperHeight}`);
		svgCraft.forEach((svg) => {
			svg.querySelectorAll('.s-craft-rect-mask').forEach((r, idx) => {
				if (window.innerWidth < 768) {
					if (idx === 0) r.setAttribute('y', '50');
					if (idx === 2) r.setAttribute('y', '95');
				}
				if (window.innerWidth < 1200) {
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
				} else {
					r.setAttribute('width', '214');
					if (idx === 0) r.setAttribute('x', '0');
					if (idx === 1) r.setAttribute('x', '222');
					if (idx === 2) r.setAttribute('x', '444');
				}
			});
		});
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
					r.setAttribute('y', '30');
					r.setAttribute('x', '0');
				}
				if (idx === 1) {
					r.setAttribute('y', '95');
				}
				if (idx === 2) {
					r.setAttribute('y', '0');
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

export const heroVideoHover = (x, y) => {
	if (window.innerWidth < 992) return;
	const wrapperWidth = videoWrapper.offsetWidth;
	const wrapperHeight = 412;
	const xPercent = +Number((x * 100) / wrapperWidth / 100).toFixed(2);
	const yPercent = +Number((y * 100) / wrapperHeight / 100).toFixed(2);

	if (xPercent < 0.1 || xPercent > 0.9 || yPercent < 0.1 || yPercent > 0.9) {
		videoWrapper.classList.add('reset');
	} else {
		videoWrapper.classList.remove('reset');
	}

	if (xPercent < 0.15 && xPercent > 0) {
		maskRects[0]?.style.setProperty('--scale-y', 0.5);
	} else {
		maskRects[0]?.style.setProperty('--scale-y', 1);
	}
	if (xPercent < 0.2 && xPercent > 0.1) {
		maskRects[1]?.style.setProperty('--scale-y', 0.8);
	} else {
		maskRects[1]?.style.setProperty('--scale-y', 1);
	}
	if (xPercent < 0.3 && xPercent > 0.2) {
		maskRects[2]?.style.setProperty('--scale-y', 0.7);
	} else {
		maskRects[2]?.style.setProperty('--scale-y', 1);
	}
	if (xPercent < 0.35 && xPercent > 0.25) {
		maskRects[3]?.style.setProperty('--scale-y', 0.9);
	} else {
		maskRects[3]?.style.setProperty('--scale-y', 1);
	}
	if (xPercent < 0.45 && xPercent > 0.35) {
		maskRects[4]?.style.setProperty('--scale-y', 0.8);
	} else {
		maskRects[4]?.style.setProperty('--scale-y', 1);
	}
	if (xPercent < 0.55 && xPercent > 0.45) {
		maskRects[5]?.style.setProperty('--scale-y', 0.7);
	} else {
		maskRects[5]?.style.setProperty('--scale-y', 1);
	}
	if (xPercent < 0.65 && xPercent > 0.55) {
		maskRects[6]?.style.setProperty('--scale-y', 0.8);
	} else {
		maskRects[6]?.style.setProperty('--scale-y', 1);
	}
	if (xPercent < 0.75 && xPercent > 0.65) {
		maskRects[7]?.style.setProperty('--scale-y', 0.8);
	} else {
		maskRects[7]?.style.setProperty('--scale-y', 1);
	}
	if (xPercent < 0.85 && xPercent > 0.75) {
		maskRects[8]?.style.setProperty('--scale-y', 0.7);
	} else {
		maskRects[8]?.style.setProperty('--scale-y', 1);
	}
	if (xPercent < 0.95 && xPercent > 0.85) {
		maskRects[9]?.style.setProperty('--scale-y', 0.8);
	} else {
		maskRects[9]?.style.setProperty('--scale-y', 1);
	}
	if (xPercent < 1 && xPercent > 0.85) {
		maskRects[10]?.style.setProperty('--scale-y', 0.5);
	} else {
		maskRects[10]?.style.setProperty('--scale-y', 1);
	}
	// maskRects[0]?.style.setProperty('--scale-y', xPercent + 0.5 > 1 ? 1 : xPercent + 0.5);
	// maskRects[1]?.style.setProperty('--scale-y', xPercent + 0.5 > 1 ? 1 : xPercent + 0.5);
	// maskRects[2]?.style.setProperty('--scale-y', xPercent + 0.5 > 1 ? 1 : xPercent + 0.5);
	// maskRects[3]?.style.setProperty('--scale-y', xPercent + 0.5 > 1 ? 1 : xPercent + 0.5);
	// maskRects[4]?.style.setProperty('--scale-y', xPercent + 0.5 > 1 ? 1 : xPercent + 0.5);
	// maskRects[5]?.style.setProperty('--scale-y', xPercent + 0.5 > 1 ? 1 : xPercent + 0.5);
	// maskRects[6]?.style.setProperty('--scale-y', xPercent + 0.5 > 1 ? 0.9 : xPercent + 0.5);
	// maskRects[7]?.style.setProperty('--scale-y', xPercent + 0.5 > 1 ? 0.8 : xPercent + 0.5);
	// maskRects[8]?.style.setProperty('--scale-y', xPercent + 0.5 > 1 ? 0.7 : xPercent + 0.5);
	// maskRects[9]?.style.setProperty('--scale-y', xPercent + 0.5 > 1 ? 0.6 : xPercent + 0.5);
	// maskRects[10]?.style.setProperty('--scale-y', xPercent + 0.5 > 1 ? 0.5 : xPercent + 0.5);
};

export default createHeroVideo;
