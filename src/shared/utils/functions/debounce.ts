export function debounce<T extends Array<unknown>>(
	func: (...args: T) => void,
	wait: number,
): (...args: T) => void {
	let timeout: thread | undefined;

	return (...args: T) => {
		if (timeout !== undefined) {
			task.cancel(timeout);
		}

		timeout = task.delay(wait, () => {
			func(...args);
			timeout = undefined;
		});
	};
}

export function throttle<T extends Array<unknown>>(
	func: (...args: T) => void,
	limit: number,
): (...args: T) => void {
	let inThrottle = false;

	return (...args: T) => {
		if (!inThrottle) {
			func(...args);
			inThrottle = true;
			task.delay(limit, () => {
				inThrottle = false;
			});
		}
	};
}

