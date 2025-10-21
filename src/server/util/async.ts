export async function retry<T>(
	fn: () => Promise<T>,
	maxAttempts: number,
	delayMs: number = 1000,
): Promise<T> {
	let lastError: unknown;

	for (let attempt = 1; attempt <= maxAttempts; attempt++) {
		try {
			return await fn();
		} catch (error) {
			lastError = error;
			if (attempt < maxAttempts) {
				task.wait(delayMs / 1000);
			}
		}
	}

	throw lastError;
}

export function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
	return Promise.race([
		promise,
		new Promise<T>((_, reject) => {
			task.delay(ms / 1000, () => {
				reject(new Error("Operation timed out"));
			});
		}),
	]);
}

