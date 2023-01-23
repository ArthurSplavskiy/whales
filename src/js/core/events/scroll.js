const stories = document.querySelector('.s-stories-grid');

export const windowScroll = () => {
	//console.log('x', stories.getBoundingClientRect().top - window.innerHeight);
	// if (stories.getBoundingClientRect().top - window.innerHeight < 0) {
	// 	const f = window.pageYOffset / (stories.offsetHeight - window.innerHeight);
	// 	const c = Math.round(f);
	// 	document.body.style.setProperty('--scroll-stories', f); //f < 9 ? 9 : f > 9.9 ? 9.9 : f
	// }
};
