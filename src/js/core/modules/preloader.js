export default class Preloader {
	constructor(opt) {
		const preloader = document.querySelector('.preloader');
		this.preloaderAnimationDuration = opt?.animationDuration;
		this.lottie = opt?.lottie;
		if (this.lottie) {
			addLottieAnimation('[data-lottie="preloader"]', this.lottie);
		}
	}
}
