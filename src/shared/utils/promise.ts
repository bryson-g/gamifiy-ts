export function delay(seconds: number): Promise<void> {
	return new Promise((resolve) => {
		task.delay(seconds, () => resolve());
	});
}

export function promiseAll<T>(promises: Promise<T>[]): Promise<T[]> {
	return Promise.all(promises);
}

export function promiseRace<T>(promises: Promise<T>[]): Promise<T> {
	return Promise.race(promises);
}

export function promiseAllSettled<T>(
	promises: Promise<T>[],
): Promise<Array<{ status: "fulfilled"; value: T } | { status: "rejected"; reason: unknown }>> {
	return Promise.all(
		promises.map((promise) =>
			promise
				.then((value) => ({ status: "fulfilled" as const, value }))
				.catch((reason) => ({ status: "rejected" as const, reason })),
		),
	);
}

