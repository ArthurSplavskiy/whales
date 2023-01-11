export function numberGrover(speed = 70) {
	const numberElements = document.querySelectorAll('[data-counter-to]');
	if (numberElements.length > 0) {
		numberElements.forEach((n) => {
			const from = Number(n.dataset.counterFrom);
			const to = Number(n.dataset.counterTo);
			let value = from;

			const intervalId = setInterval(() => {
				value += 1;
				if (value === to) {
					clearInterval(intervalId);
				}
				n.textContent = value;
			}, speed);
		});
	}
}
