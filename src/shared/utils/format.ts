export function formatNumber(num: number): string {
	if (num >= 1000000) {
		return `${math.floor(num / 100000) / 10}M`;
	}
	if (num >= 1000) {
		return `${math.floor(num / 100) / 10}K`;
	}
	return tostring(num);
}

export function formatTime(seconds: number): string {
	const hours = math.floor(seconds / 3600);
	const minutes = math.floor((seconds % 3600) / 60);
	const secs = math.floor(seconds % 60);

	if (hours > 0) {
		return `${hours}:${string.format("%02d", minutes)}:${string.format("%02d", secs)}`;
	}
	return `${minutes}:${string.format("%02d", secs)}`;
}

export function formatPercentage(value: number, decimals: number = 1): string {
	return `${(value * 100).toFixed(decimals)}%`;
}

export function formatCurrency(amount: number, symbol: string = "$"): string {
	return `${symbol}${formatNumber(amount)}`;
}

