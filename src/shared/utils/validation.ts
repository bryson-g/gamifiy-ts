export function isValidUsername(username: string): boolean {
	return username.size() >= 3 && username.size() <= 20;
}

export function clamp(value: number, min: number, max: number): number {
	return math.max(min, math.min(max, value));
}

export function isPositiveInteger(value: number): boolean {
	return value > 0 && value === math.floor(value);
}

export function isWithinRange(value: number, min: number, max: number): boolean {
	return value >= min && value <= max;
}

export function isEmpty(value: string | undefined): boolean {
	return value === undefined || value === "" || value.size() === 0;
}

