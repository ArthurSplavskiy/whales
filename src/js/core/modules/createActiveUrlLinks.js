export const createActiveUrlLinks = () => {
	const links = document.querySelectorAll('.header-menu-item');

	links?.forEach((link) => {
		const linkPath = link.querySelector('a[href]').href;
		if (linkPath === location.href) {
			link.classList.add('_active');
		}
	});
};
