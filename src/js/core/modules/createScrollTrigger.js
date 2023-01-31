import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger.js';
gsap.registerPlugin(ScrollTrigger);

const createScrollTriggerDesktop = () => {
	const t = {
		trigger: '.s-stories',
		start: '20% bottom',
		scrub: true
	};
	const t2 = {
		trigger: '.s-meet',
		start: '40% bottom',
		scrub: true
	};
	if (window.innerWidth >= 768) {
		gsap.to('.stories-card-down', {
			scrollTrigger: t,
			yPercent: 30
		});
		gsap.to('.stories-card-up', {
			scrollTrigger: t,
			yPercent: -15
		});
		gsap.to('.meet-card-down', {
			scrollTrigger: t2,
			y: '150px'
		});
		gsap.to('.meet-card-up', {
			scrollTrigger: t2,
			y: '-50px'
		});
	} else {
		gsap.to('.stories-card:nth-child(odd)', {
			scrollTrigger: t,
			yPercent: 30
		});
		gsap.to('.stories-card:nth-child(even)', {
			scrollTrigger: t,
			yPercent: -15
		});
		gsap.to('.meet-card:nth-child(even)', {
			scrollTrigger: t2,
			y: '-150px'
		});
		gsap.to('.meet-card:nth-child(odd)', {
			scrollTrigger: t2,
			y: '50px'
		});
	}
};

export { createScrollTriggerDesktop };
