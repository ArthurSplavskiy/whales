import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger.js';
gsap.registerPlugin(ScrollTrigger);

const createScrollTriggerDesktop = () => {
	const t = {
		trigger: '.s-stories',
		start: 'top bottom',
		scrub: true
	};
	const t2 = {
		trigger: '.s-meet',
		start: 'top bottom',
		scrub: true
	};
	gsap.to('.stories-card-down', {
		scrollTrigger: t,
		yPercent: 30
	});
	gsap.to('.stories-card-up', {
		scrollTrigger: t,
		yPercent: -30
	});
	gsap.to('.meet-card-down', {
		scrollTrigger: t2,
		y: '100px'
	});
	gsap.to('.meet-card-up', {
		scrollTrigger: t2,
		y: '-100px'
	});
	// gsap.to('.stories-card-up img', {
	// 	scrollTrigger: t,
	// 	top: '60px'
	// });
	// gsap.to('.stories-card-down img', {
	// 	scrollTrigger: t,
	// 	top: '-60px'
	// });
};

// const createScrollTriggerMobile = () => {
// 	const t = {
// 		trigger: '.s-stories',
// 		start: 'top bottom',
// 		scrub: true
// 	};
// 	gsap.to('.stories-card:nth-child(odd)', {
// 		scrollTrigger: t,
// 		yPercent: -30
// 	});
// 	gsap.to('.stories-card:nth-child(even)', {
// 		scrollTrigger: t,
// 		yPercent: 30
// 	});
// 	gsap.to('.stories-card:nth-child(odd)', {
// 		scrollTrigger: t,
// 		top: '-20px'
// 	});
// 	gsap.to('.stories-card:nth-child(even)', {
// 		scrollTrigger: t,
// 		top: '20px'
// 	});
// };

export { createScrollTriggerDesktop };
