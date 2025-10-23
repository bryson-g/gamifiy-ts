export function lerp(a: number, b: number, t: number): number {
	return a + (b - a) * t;
}

export function inverseLerp(a: number, b: number, value: number): number {
	return (value - a) / (b - a);
}

export function remap(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
	const t = inverseLerp(inMin, inMax, value);
	return lerp(outMin, outMax, t);
}

export function roundToDecimal(value: number, decimals: number): number {
	const multiplier = math.pow(10, decimals);
	return math.round(value * multiplier) / multiplier;
}

export function randomRange(min: number, max: number): number {
	return min + math.random() * (max - min);
}

export function randomInt(min: number, max: number): number {
	return math.floor(randomRange(min, max + 1));
}

