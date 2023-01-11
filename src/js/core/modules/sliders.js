// ajaxCacheScript(dir + "libs/swiper.js", function () {
//
//     function sliderRefresh(slider, obj, container) {
//         window.addEventListener('resize', function () {
//             setTimeout(function () {
//                 slider.destroy();
//                 slider = new Swiper(container, obj);
//             }, 500);
//         });
//     }
//
//     $(".swiper-js").each(function () {
//         let _this = $(this), container = _this.find(".swiper-container")[0];
//         //slider
//         if (_this.hasClass('sGal')) {
//
//             let sGalObj = {
//                 grabCursor           : true,
//                 longSwipesRatio      : 0.03,
//                 slidesPerView        : 'auto',
//                 updateOnWindowResize : false,
//                 loop                 : true,
//                 initialSlide         : 3,
//                 spaceBetween         : 20,
//                 arrow                : false,
//                 observer             : true,
//                 observeParents       : true,
//                 observeSlideChildren : true,
//                 centeredSlides       : true,
//                 speed                : 600,
//                 slideToClickedSlide  : true,
//                 navigation           : {
//                     nextEl : _this.find('[data-next]')[0],
//                     prevEl : _this.find('[data-prev]')[0],
//                 },
//                 keyboard             : {
//                     enabled        : true,
//                     onlyInViewport : false,
//                 },
//                 /*mousewheel: {
//                  sensitivity: 0,
//                  eventsTarget: container,
//                  // releaseOnEdges: true,
//                  },*/
//                 /*breakpoints          : {
//                  // when window width is >=  ...
//                  320  : {
//                  spaceBetween  : -25,
//                  slidesPerView : 1,
//                  // mousewheel: false,
//                  },
//                  768  : {
//                  spaceBetween  : -55,
//                  slidesPerView : 1,
//                  // mousewheel: false,
//                  },
//                  1024 : {
//                  spaceBetween  : -80,
//                  slidesPerView : 1,
//                  // mousewheel: false,
//                  },
//                  1280 : {
//                  slidesPerView  : 'auto',
//                  centeredSlides : true,
//                  spaceBetween   : 30,
//                  }
//                  }*/
//                 scrollbar            : {
//                     el        : _this.find('[data-scrollbar]')[0],
//                     draggable : true,
//                 },
//             };
//
//             let sGal = new Swiper(container, sGalObj);
//
//             // sliderRefresh(sGal, sGalObj, container);
//
//             window.addEventListener('resize', function () {
//                 setTimeout(function () {
//                     sGal.destroy();
//                     sGal = new Swiper(container, sGalObj);
//                 }, 1100);
//             });
//         }
//     });
// });

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

	if (document.querySelector("[data-swiper='sertificates-slider']")) {
		let slider;
		const container = "[data-swiper='sertificates-slider']";
		const sliderOptions = {
			autoHeight: true,
			slidesPerView: 4,
			spaceBetween: 24,
			speed: 500,
			navigation: {
				prevEl: '[data-swiper-control="sertificates-slider-prev"]',
				nextEl: '[data-swiper-control="sertificates-slider-next"]',
				disabledClass: '_disabled'
			},
			keyboard: {
				enabled: true,
				onlyInViewport: false
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 16
				},
				480: {
					slidesPerView: 2,
					spaceBetween: 16
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 24
				},
				1380: {
					slidesPerView: 4,
					spaceBetween: 24
				}
			}
		};
		slider = new Swiper(container, sliderOptions);
	}

	if (document.querySelector("[data-swiper='partners-slider']")) {
		let slider;
		const container = "[data-swiper='partners-slider']";
		const sliderOptions = {
			speed: 800,
			slidesPerView: 3,
			loop: true,
			navigation: {
				nextEl: '[data-swiper-control="partners-slider-next"]',
				prevEl: '[data-swiper-control="partners-slider-prev"]'
			},
			spaceBetween: 16,
			keyboard: {
				enabled: true,
				onlyInViewport: false
			},
			breakpoints: {
				0: {
					slidesPerView: 1.2
				},
				480: {
					slidesPerView: 2
				},
				768: {
					slidesPerView: 2.5
				},
				992: {
					slidesPerView: 3
				}
			}
		};
		slider = new Swiper(container, sliderOptions);
	}

	if (document.querySelector("[data-swiper='gallery-slider']")) {
		let slider;
		const container = "[data-swiper='gallery-slider']";
		const sliderOptions = {
			speed: 800,
			slidesPerView: 2,
			loop: true,
			navigation: {
				nextEl: '[data-swiper-control="gallery-slider-next"]',
				prevEl: '[data-swiper-control="gallery-slider-prev"]'
			},
			spaceBetween: 24,
			centeredSlides: true,
			keyboard: {
				enabled: true,
				onlyInViewport: false
			},
			breakpoints: {
				0: {
					slidesPerView: 1.2
				},
				480: {
					slidesPerView: 1.2
				},
				768: {
					slidesPerView: 1.6
				},
				992: {
					slidesPerView: 2
				}
			}
		};
		slider = new Swiper(container, sliderOptions);
	}

	if (document.querySelector("[data-swiper='news-slider']")) {
		let slider;
		const container = "[data-swiper='news-slider']";
		const sliderOptions = {
			//autoHeight: true,
			slidesPerView: 3,
			spaceBetween: 24,
			speed: 500,
			loop: true,
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

	if (document.querySelector("[data-swiper='quote-slider']")) {
		let slider;
		const container = "[data-swiper='quote-slider']";
		const sliderOptions = {
			parallax: true,
			autoHeight: true,
			slidesPerView: 1,
			spaceBetween: 24,
			speed: 800,
			navigation: {
				prevEl: '[data-swiper-control="quote-slider-prev"]',
				nextEl: '[data-swiper-control="quote-slider-next"]',
				disabledClass: '_disabled'
			}
		};
		slider = new Swiper(container, sliderOptions);
	}

	if (document.querySelector("[data-swiper='timeline']")) {
		console.log('here');
		const timelineSwiper = new Swiper("[data-swiper='timeline']", {
			slidesPerView: 2.9,
			spaceBetween: 24,
			freeMode: true,
			watchSlidesProgress: true,
			breakpoints: {
				0: {
					slidesPerView: 1.2,
					spaceBetween: 16
				},
				480: {
					slidesPerView: 1.9
				},
				768: {
					slidesPerView: 1.9
				},
				992: {
					slidesPerView: 2.2
				},
				1200: {
					slidesPerView: 1.9,
					spaceBetween: 24
				},
				1400: {
					slidesPerView: 2.9
				}
			}
		});
		new Swiper("[data-swiper='timeline-head']", {
			spaceBetween: 10,
			slidesPerView: 1,
			navigation: {
				prevEl: '[data-swiper-control="timeline-slider-prev"]',
				nextEl: '[data-swiper-control="timeline-slider-next"]',
				disabledClass: '_disabled'
			},
			thumbs: {
				swiper: timelineSwiper
			}
		});
	}
}

window.addEventListener('load', function (e) {
	initSliders();
});
