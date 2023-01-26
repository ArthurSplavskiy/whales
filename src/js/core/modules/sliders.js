import { debounce } from '../utils/functions.js';

function sliderRefresh(slider, obj, container) {
	window.addEventListener('resize', function () {
		setTimeout(function () {
			slider?.destroy();
			slider = new Swiper(container, obj);
		}, 500);
	});
}

function bildSliders() {
	let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
	if (sliders) {
		sliders.forEach((slider) => {
			slider.parentElement.classList.add('swiper');
			slider.classList.add('swiper-wrapper');
			for (const slide of slider.children) {
				slide.classList.add('swiper-slide');
			}
		});
	}
}

function initSliders() {
	bildSliders();

	if (document.querySelector("[data-swiper='craft-slider-text']")) {
		const imageSwiper = new Swiper("[data-swiper='craft-slider-img']", {
			speed: 0,
			spaceBetween: 20,
			parallax: true,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			}
		});
		const textSwiper = new Swiper("[data-swiper='craft-slider-text']", {
			speed: 0,
			slidesPerView: 1,
			autoHeight: true,
			parallax: true,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			pagination: {
				el: '[data-swiper-control="craft-slider-pagination"]',
				type: 'fraction'
			},
			thumbs: {
				swiper: imageSwiper
			}
		});

		for (let i = 0; i < imageSwiper.slides.length; i++) {
			const slide = imageSwiper.slides[i];
			const maskImage = slide.querySelector('.craft-image');
			const svgClipPath = maskImage.querySelector('.craft-clip');
			svgClipPath.setAttribute('id', `craft-clip-${i}`);
			maskImage.style.clipPath = `url(#craft-clip-${i})`;
		}
		const slidePrev = document.querySelector('[data-swiper-control="craft-slider-prev"]');
		const slideNext = document.querySelector('[data-swiper-control="craft-slider-next"]');

		slideNext.onclick = () => {
			if (imageSwiper.activeIndex + 1 === imageSwiper.slides.length) return;
			slidePrev.style.pointerEvents = 'none';
			slideNext.style.pointerEvents = 'none';
			imageSwiper.slides[imageSwiper.activeIndex].classList.add('animationOut');
			textSwiper.slides[textSwiper.activeIndex].classList.add('animationOut');
			setTimeout(() => {
				imageSwiper.slides[imageSwiper.activeIndex].classList.remove('animationOut');
				textSwiper.slides[textSwiper.activeIndex].classList.remove('animationOut');
				textSwiper.slideNext();
				imageSwiper.slides[imageSwiper.activeIndex].classList.add('animationIn');
				textSwiper.slides[textSwiper.activeIndex].classList.add('animationIn');
				setTimeout(() => {
					imageSwiper.slides[imageSwiper.activeIndex].classList.remove('animationIn');
					textSwiper.slides[textSwiper.activeIndex].classList.remove('animationIn');
					slidePrev.style.pointerEvents = 'all';
					slideNext.style.pointerEvents = 'all';
				}, 1000);
			}, 1000);
		};
		slidePrev.onclick = () => {
			if (imageSwiper.activeIndex === 0) return;
			slidePrev.style.pointerEvents = 'none';
			slideNext.style.pointerEvents = 'none';
			imageSwiper.slides[imageSwiper.activeIndex].classList.add('animationOut');
			textSwiper.slides[textSwiper.activeIndex].classList.add('animationOut');
			setTimeout(() => {
				imageSwiper.slides[imageSwiper.activeIndex].classList.remove('animationOut');
				textSwiper.slides[textSwiper.activeIndex].classList.remove('animationOut');
				textSwiper.slidePrev();
				imageSwiper.slides[imageSwiper.activeIndex].classList.add('animationIn');
				textSwiper.slides[textSwiper.activeIndex].classList.add('animationIn');
				setTimeout(() => {
					imageSwiper.slides[imageSwiper.activeIndex].classList.remove('animationIn');
					textSwiper.slides[textSwiper.activeIndex].classList.remove('animationIn');
					slidePrev.style.pointerEvents = 'all';
					slideNext.style.pointerEvents = 'all';
				}, 1000);
			}, 1000);
		};
	}

	if (document.querySelector("[data-swiper='team-slider']")) {
		let slider;
		const container = "[data-swiper='team-slider']";
		const sliderOptions = {
			autoHeight: true,
			slidesPerView: 1,
			speed: 0,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			pagination: {
				el: '[data-swiper-control="team-slider-pagination"]',
				type: 'fraction'
			},
			keyboard: {
				enabled: true,
				onlyInViewport: false
			}
		};
		const sliderOptionsMobile = {
			autoHeight: true,
			slidesPerView: 1,
			speed: 400,
			pagination: {
				el: '[data-swiper-control="team-slider-pagination"]',
				type: 'fraction'
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 8
				},
				992: {
					slidesPerView: 1
				}
			},
			navigation: {
				prevEl: '[data-swiper-control="team-slider-prev"]',
				nextEl: '[data-swiper-control="team-slider-next"]',
				disabledClass: '_disabled'
			},
			keyboard: {
				enabled: true,
				onlyInViewport: false
			}
		};

		function onResize() {
			const slidePrev = document.querySelector('[data-swiper-control="team-slider-prev"]');
			const slideNext = document.querySelector('[data-swiper-control="team-slider-next"]');
			if (window.innerWidth < 992) {
				slider?.destroy();
				slider = new Swiper(container, sliderOptionsMobile);
				slideNext.onclick = () => {};
				slidePrev.onclick = () => {};
			} else {
				slider?.destroy();
				slider = new Swiper(container, sliderOptions);
				slidePrev.disabled = false;
				slideNext.disabled = false;

				slideNext.onclick = () => {
					if (slider.activeIndex + 1 === slider.slides.length) return;
					slidePrev.style.pointerEvents = 'none';
					slideNext.style.pointerEvents = 'none';
					slider.slides[slider.activeIndex].classList.add('animationOut');
					slider.slides?.[slider.activeIndex + 1]?.classList.add('animationIn');
					slider.slides?.[slider.activeIndex + 2]?.classList.add('animationIn2');
					slider.slides?.[slider.activeIndex + 3]?.classList.add('animationIn3');
					setTimeout(() => {
						slider.slides[slider.activeIndex].classList.remove('animationOut');
						slider.slideNext();
						slider.slides[slider.activeIndex].classList.remove('animationIn');
						slider.slides?.[slider.activeIndex + 1]?.classList.remove('animationIn2');
						slider.slides?.[slider.activeIndex + 2]?.classList.remove('animationIn3');
						slidePrev.style.pointerEvents = 'all';
						slideNext.style.pointerEvents = 'all';
					}, 250);
				};
				slidePrev.onclick = () => {
					if (slider.activeIndex === 0) return;
					slidePrev.style.pointerEvents = 'none';
					slideNext.style.pointerEvents = 'none';
					slider.slides[slider.activeIndex].classList.add('animationOutUp');
					slider.slides?.[slider.activeIndex - 1]?.classList.add('animationInUp');
					setTimeout(() => {
						slider.slides[slider.activeIndex].classList.remove('animationOutUp');
						slider.slidePrev();
						slider.slides[slider.activeIndex].classList.remove('animationInUp');
						slidePrev.style.pointerEvents = 'all';
						slideNext.style.pointerEvents = 'all';
					}, 250);
				};
			}
		}
		onResize = debounce(onResize, 250);
		onResize();
		window.addEventListener('resize', onResize);
	}

	if (document.querySelector("[data-swiper='advantage-text-slider']")) {
		const imageSwiper = new Swiper("[data-swiper='advantage-image-slider']", {
			speed: 600,
			spaceBetween: 20,
			parallax: true
		});
		new Swiper("[data-swiper='advantage-text-slider']", {
			speed: 600,
			slidesPerView: 1,
			parallax: true,
			navigation: {
				prevEl: '[data-swiper-control="advantage-slider-prev"]',
				nextEl: '[data-swiper-control="advantage-slider-next"]',
				disabledClass: '_disabled'
			},
			thumbs: {
				swiper: imageSwiper
			}
		});
	}

	if (document.querySelector("[data-swiper='news-slider']")) {
		let slider;
		const container = "[data-swiper='news-slider']";
		const sliderOptions = {
			//autoHeight: true,
			slidesPerView: 3,
			spaceBetween: 24,
			speed: 500,
			keyboard: {
				enabled: true,
				onlyInViewport: false
			},
			navigation: {
				nextEl: '[data-swiper-control="news-slider-next"]',
				prevEl: '[data-swiper-control="news-slider-prev"]'
			},
			breakpoints: {
				0: {
					slidesPerView: 1.1,
					spaceBetween: 16
				},
				480: {
					slidesPerView: 1.6
				},
				992: {
					slidesPerView: 2.2
				},
				1200: {
					slidesPerView: 3,
					spaceBetween: 24
				}
			}
		};
		slider = new Swiper(container, sliderOptions);
	}
}

window.addEventListener('load', function (e) {
	initSliders();
});
