// * DOC
// * ----------------------------------------------
// * new ScrollObserver({
// * element: string | nodeElement
// * 	animationIn: function
// * 	animationOut: function
// * 	observerOptions: {}
// * })
// * observerOptions = {
// *  root: document.querySelector('#scrollArea'),
// *  rootMargin: '0px',
// *  threshold: 1.0 // 1.0 - (100% element scroll) 0.9 - 90%(100% element scroll)
// * }
// * ----------------------------------------------

export default class ScrollObserver {
	constructor(options) {
		this.animationIn = options.animationIn || null;
		this.animationOut = options.animationOut || null;
		this.observerOptions = options.observerOptions;

		if (typeof options.element === 'string') {
			this.element = document.querySelectorAll(options.element);
		} else {
			this.element = options.element;
		}

		this.createObserver();
		this.$subscribe();
	}

	createObserver() {
		this.observer = new window.IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					if (this.animationIn !== null) {
						this.animationIn(entry.target);
						if (this.animationOut === null) {
							this.observer.unobserve(entry.target);
						}
					}
				} else {
					if (this.animationOut !== null) {
						this.animationOut(entry.target);
					}
				}
			});
		}, this.observerOptions);
	}

	$subscribe() {
		if (this.element instanceof NodeList) {
			this.element.forEach((el) => {
				this.observer.observe(el);
			});
		} else if (this.element instanceof Array) {
			Array.from(this.element).forEach((el) => {
				this.observer.observe(el);
			});
		} else {
			this.observer.observe(this.element);
		}
	}
}
