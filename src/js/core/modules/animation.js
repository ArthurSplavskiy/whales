//common uses selectors
import { debounce } from '../utils/functions.js';
import { addLottieAnimation } from '../utils/functions.js';

let el = {
	header: $('header'),
	preloader: $('.preloader'),
	preloaderCl: 'preloader_hide',
	nav: $('.nav'),
	navToggle: $('[data-toggleNav]'),
	body: $('body'),
	window: $(window),
	document: $(document)
};
let skrollAn;

// sizes window
function sizeWindow() {
	el.windowW = window.innerWidth;
	el.windowtH = window.innerHeight;
	el.documentH = Math.max(
		document.body.scrollHeight,
		document.documentElement.scrollHeight,
		document.body.offsetHeight,
		document.documentElement.offsetHeight,
		document.body.clientHeight,
		document.documentElement.clientHeight
	);
	el.pageScroll = Math.round(pageYOffset);
}

sizeWindow();
window.addEventListener('resize', function () {
	setTimeout(function () {
		sizeWindow();
	}, 1000);
});
window.addEventListener('load', sizeWindow);

// ajax script cache
function ajaxCacheScript(a, b) {
	$.get(a)
		.done(function () {
			$.ajax({
				url: a,
				type: 'GET',
				dataType: 'script',
				cache: true,
				success: b
			});
		})
		.fail(function () {
			console.log('file not exists on link ' + a);
		});
}

// coords
function getCoords(elem) {
	let box = elem.getBoundingClientRect();
	return {
		top: box.top,
		left: box.left,
		height: box.height,
		topPage: box.top + pageYOffset,
		leftPage: box.left + pageXOffset
	};
}

function getCoordsJq(elem) {
	let box = elem[0].getBoundingClientRect();
	return {
		top: box.top,
		left: box.left,
		height: box.height,
		topPage: box.top + pageYOffset,
		leftPage: box.left + pageXOffset
	};
}

//scroll animate
let $ease = 'swing';
ajaxCacheScript(dir + 'libs/easing.min.js', function () {
	$ease = 'easeOutCubic';
});

function funScroll(par1) {
	$('html, body').stop().animate(
		{
			scrollTop: par1
		},
		1500,
		$ease
	);
}

let scrollWidth;

function funScrollWidth() {
	let _divCreate = document.createElement('div');
	_divCreate.style.overflowY = 'scroll';
	_divCreate.style.width = '50px';
	_divCreate.style.height = '50px';
	_divCreate.style.visibility = 'hidden';
	document.body.appendChild(_divCreate);
	scrollWidth = _divCreate.offsetWidth - _divCreate.clientWidth;
	document.body.removeChild(_divCreate);
}

funScrollWidth();
window.addEventListener('resize', funScrollWidth);

function funPadding(a) {
	a.css('padding-right', +scrollWidth + 'px');
}

function funPaddingDef(a) {
	a.css('padding-right', 0);
}

function funMargin(a) {
	a.css('margin-right', +scrollWidth + 'px');
}

function funMarginDef(a) {
	a.css('margin-right', 0);
}

// detection Browser
function funBrowser() {
	$.browser = {};
	$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
	$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
	$.browser.safari = /safari/.test(navigator.userAgent.toLowerCase());
	$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
	$.browser.ie =
		/msie/.test(navigator.userAgent.toLowerCase()) || /rv/.test(navigator.userAgent.toLowerCase());
	switch (true) {
		case $.browser.mozilla:
			return 'firefox';
		case $.browser.chrome:
			return 'chrome';
		case $.browser.safari:
			return 'safari';
		case $.browser.opera:
			return 'opera';
		case $.browser.ie:
			return 'ie';
	}
}

el.body.addClass(funBrowser);

/*
 * Replace all SVG images with inline SVG
 */
function svgInline() {
	$('img[src*="svg"]')
		.not('.preloader__img, .it__itImg')
		.each(function () {
			let $img = $(this),
				imgID = $img.attr('id'),
				imgClass = $img.attr('class'),
				imgURL = $img.attr('src'),
				imgDataAn = $img.attr('data-an'),
				imgDataDur = $img.attr('data-dur'),
				imgDataDel = $img.attr('data-del');

			$.get(
				imgURL,
				function (data) {
					// Get the SVG tag, ignore the rest
					let $svg = $(data).find('svg');
					if ($svg) {
						$svg.find('path').removeAttr('style');
						// Remove any invalid XML tags as per http://validator.w3.org
						$svg.removeAttr('id x y version xmlns xml:space xmlns:a');
						$svg.find('style').detach();
						// Add replaced image ID to the new SVG
						if (imgID !== undefined) $svg.attr('id', imgID);
						// Add replaced image classes to the new SVG
						if (imgClass !== undefined) $svg.attr('class', 'replaced__svg ' + imgClass);
						else $svg.attr('class', 'replaced__svg');
						if (imgDataAn !== undefined) $svg.attr('data-an', imgDataAn);
						if (imgDataDur !== undefined) $svg.attr('data-dur', imgDataDur);
						if (imgDataDel !== undefined) $svg.attr('data-del', imgDataDel);

						// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
						/*if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
         $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
         }*/
						// Replace image with new SVG
						$img.replaceWith($svg);
					}
				},
				'xml'
			);
		});
}

svgInline();

//elements show
function animateEl(elements) {
	let scroll = window.pageYOffset ? window.pageYOffset : 0;
	elements.each(function () {
		let _this = $(this);
		if (_this.hasClass('showEl')) return;
		let cord = getCoordsJq(_this);
		if (cord.top < el.windowtH || cord.top + cord.height < 1) {
			el.elAnimateScroll = el.elAnimateScroll.not(_this);

			if (_this.is('[data-videoAutoplay]')) _this[0].play();
			if (_this.is('[data-del]')) _this.css('animation-delay', _this.data('del') + 's');
			if (_this.is('[data-dur]')) {
				_this.css('animation-duration', _this.data('dur') + 's');

				setTimeout(function () {
					_this.addClass('_pointer');
				}, _this.data('dur') * 1000 + 100);
			} else {
				setTimeout(function () {
					_this.addClass('_pointer');
				}, 1600);
			}
			_this.addClass('_animated ' + _this.data('an'));

			function numCount(el) {
				let sec = 2,
					stepSec = 40,
					frames = 1000 / stepSec,
					i = 0,
					num = parseInt(el.data('num').toString().replace(' ', '')),
					step = parseFloat(num / sec / frames);
				let int = setInterval(function () {
					i += step;
					if (i <= num) _this.html(parseInt(i).toLocaleString('ru'));
					else {
						_this.html(num.toLocaleString('ru'));
						clearInterval(int);
					}
				}, stepSec);
			}

			if (_this.is("[data-an='_num']")) {
				numCount(_this);
				/*setTimeout(function () {
         numCount(_this);
         }, 1000);*/
			}

			/*setTimeout(function () {
       _this.removeClass("_showEl _animated _pointer");
       }, 10000);*/
		}
	});
}

function animateStart() {
	requestAnimationFrame(function () {
		el.elAnimateScroll = $('[data-an]');
		if (el.elAnimateScroll.length) {
			animateEl(el.elAnimateScroll);
			el.window.scroll(function animateElScroll() {
				if (!el.elAnimateScroll.length) el.window.unbind('scroll', animateElScroll);
				animateEl(el.elAnimateScroll);
			});
		}
	});
}

//preloader
function funPreloader() {
	el.preloader.addClass(el.preloaderCl);
	setTimeout(function () {
		animateStart?.();
	}, 400);
	setTimeout(function () {
		el.preloader.remove();
	}, 1000);
}

$(window).on('load', function () {
	//after full load
	//hide preloader after load
	const firstLoad = document.cookie
		.split(';')
		.filter((c) => c.includes('firstLoad'))?.[0]
		?.split('=')?.[1];

	if (!Boolean(firstLoad) && !el.preloader.hasClass(el.preloaderCl)) {
		setTimeout(() => {
			funPreloader();
		}, 4000);
	} else {
		funPreloader();
	}

	if (!Boolean(firstLoad)) {
		addLottieAnimation('[data-lottie="preloader"]', 'others/preloader.json');
	}

	document.cookie = 'firstLoad=false; max-age=60*60*12';
});

el.document.ready(function () {
	'use strict';

	//preloader show time limit after document ready
	// setTimeout(function () {
	//   if (!el.preloader.hasClass(el.preloaderCl)) funPreloader();
	// }, 3000);

	document.body.classList.add('ontouchstart' in document.documentElement ? 'touch' : 'no-touch');

	//anchors
	$("a[href^='#']").click(function (e) {
		e.preventDefault();
	});
	$("a[href^='#'], [data-anchor]").click(function (e) {
		//e.preventDefault();

		let _this = $(this),
			elDta;

		if (_this.is('[data-anchor]')) elDta = $('#' + _this.data('anchor'));
		else if (_this.is('[href]') && _this.attr('href').length > 1) {
			let _href = _this.attr('href');
			elDta = $(_href);

			if (_href === '#bCont') {
				setTimeout(function () {
					$(_href + ' .form__input')
						.first()
						.focus();
				}, 1000);
			}
		} else return;

		if (elDta.length) {
			let nav = el.header,
				top,
				navHeight;

			top = elDta.offset().top;

			if (nav.length && nav.css('position') === 'fixed') {
				// ||
				'absolute' && el.documentH > el.windowtH;
				navHeight = el.header.outerHeight();
				top -= navHeight;
			}
			funScroll(top);

			if (el.navToggle.hasClass('active')) {
				el.navToggle.trigger('click');
			}
		}
	});

	el.navToggle.click(function () {
		el.navToggle.toggleClass('active');
		el.nav.toggleClass('active');
		el.header.toggleClass('active');
		if (el.nav.hasClass('active') && el.documentH > el.windowtH) {
			el.body.toggleClass('dropdown');
			funPadding(el.header);
			// funPadding(el.nav);
			funPadding(el.body);
			// funMargin(el.body);
		} else {
			setTimeout(function () {
				el.body.toggleClass('dropdown');
				funPaddingDef(el.header);
				// funPaddingDef(el.nav);
				funPaddingDef(el.body);
				// funMarginDef(el.body);
			}, 400);
		}
	});

	//toggle sub menu
	$('.nav__toggleSub, .footer__it-t').click(function () {
		let _this = $(this);
		_this.toggleClass('_active');
		_this.next().slideToggle();
	});

	function menuFix() {
		if (pageYOffset > 0) el.header.addClass('_down');
		else el.header.removeClass('_down');
	}

	window.addEventListener('resize', function () {
		if (window.innerWidth >= 1024 && el.navToggle.hasClass('active')) {
			el.navToggle.trigger('click');
		}
	});

	window.addEventListener('resize', function () {
		if (window.innerWidth >= 1024 && el.navToggle.hasClass('active')) {
			el.navToggle.trigger('click');
		}
	});

	window.addEventListener('scroll', menuFix);
	menuFix();

	// titers duration
	let titers = $('.titers');
	if (titers.length) {
		titers.each(titersSpeed);
		window.addEventListener('resize', function () {
			titers.each(titersSpeed);
		});
	}

	function titersSpeed() {
		let _this = $(this);
		let list = _this.find('.titers__list');
		let speed = list.is('[data-speed]') ? +list.data('speed') : 25;
		let res = parseInt(list.width() / speed);
		list.css('animation-duration', res + 's');
	}

	// init event scroll
	let scrollEvent = new UIEvent('scroll');
	window.dispatchEvent(scrollEvent);
});
