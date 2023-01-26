export const createStickyNav = () => {
	const links = document.querySelectorAll('[data-anchor]');

	if ('IntersectionObserver' in window) {
		const options = {
			root: null,
			rootMargin: '0px',
			threshold: 1
		};

		let intersectHandler = function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					links?.forEach(function (a) {
						if (a.dataset.anchor.slice(1) == entry.target.id) {
							a.classList.add('is-selected');
						} else {
							a.classList.remove('is-selected');
						}
					});
				}
			});
		};

		const observer = new IntersectionObserver(intersectHandler, options);

		const targets =
			Array.from(links).length &&
			document.querySelectorAll(Array.from(links)?.map((link) => link?.dataset.anchor));
		targets.length &&
			targets.forEach(function (target) {
				observer.observe(target);
			});
	}
};
