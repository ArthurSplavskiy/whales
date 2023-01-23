import gsap, { Power3 } from 'gsap';

export const mouseMoveHandler = (e) => {
	gsap.to('.click-cursor', {
		css: {
			left: e.clientX - 12,
			top: e.clientY - 12
		}
	});
};

export const mouseEnterHandler = () => {
	gsap.to('.click-cursor', {
		autoAlpha: 1,
		scale: 1,
		duration: 0.4,
		ease: Power3.easeOut
	});
};

export const mouseLeaveHandler = () => {
	gsap.to('.click-cursor', {
		autoAlpha: 0,
		scale: 0,
		duration: 0.4,
		ease: Power3.easeIn
	});
};
