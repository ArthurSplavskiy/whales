import { heroVideoHover } from '../modules/heroVideo.js';
export function windowMousemove(e) {
	const x = e.offsetX;
	const y = e.offsetY;
	heroVideoHover(x, y);
}
