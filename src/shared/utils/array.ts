export function shuffle<T>(array: T[]): T[] {
	const shuffled = [...array];
	for (let i = shuffled.size() - 1; i > 0; i--) {
		const j = math.floor(math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

export function chunk<T>(array: T[], size: number): T[][] {
	const chunks: T[][] = [];
	for (let i = 0; i < array.size(); i += size) {
		chunks.push(array.slice(i, i + size));
	}
	return chunks;
}

export function unique<T>(array: T[]): T[] {
	const seen = new Set<T>();
	return array.filter((item) => {
		if (seen.has(item)) return false;
		seen.add(item);
		return true;
	});
}

export function sample<T>(array: T[]): T | undefined {
	if (array.size() === 0) return undefined;
	return array[math.floor(math.random() * array.size())];
}

