import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger.js';
gsap.registerPlugin(ScrollTrigger);

export const createParallax = () => {
	gsap.utils.toArray('.s-full-image-ibg img').forEach((section, i) => {
		const heightDiff = section.offsetHeight - section.parentElement.offsetHeight;
		gsap.fromTo(
			section,
			{
				y: -heightDiff
			},
			{
				scrollTrigger: {
					trigger: section.parentElement,
					scrub: true
				},
				y: 0,
				ease: 'none'
			}
		);
	});
};
