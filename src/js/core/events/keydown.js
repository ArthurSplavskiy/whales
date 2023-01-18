import { bodyLockStatus, bodyUnlock } from '../utils/functions.js';

export const documentKeyDown = (e) => {
	if (e.key === 'Escape') {
		setTimeout(() => {
			document.querySelectorAll('.popup').forEach((popup) => {
				popup.classList.remove('_open');
			});
			document.documentElement.classList.remove('popup-open');
			if (bodyLockStatus) {
				bodyUnlock();
			}
		}, 500);
	}
};
