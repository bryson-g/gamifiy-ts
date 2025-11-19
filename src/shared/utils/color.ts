export function hexToColor3(hex: string): Color3 {
	const cleanHex = hex.gsub("#", "")[0];
	const r = tonumber(cleanHex.sub(1, 2), 16) ?? 0;
	const g = tonumber(cleanHex.sub(3, 4), 16) ?? 0;
	const b = tonumber(cleanHex.sub(5, 6), 16) ?? 0;
	return Color3.fromRGB(r, g, b);
}

export function color3ToHex(color: Color3): string {
	const r = math.floor(color.R * 255);
	const g = math.floor(color.G * 255);
	const b = math.floor(color.B * 255);
	return `#${string.format("%02X%02X%02X", r, g, b)}`;
}

export function lerpColor(a: Color3, b: Color3, t: number): Color3 {
	return new Color3(
		a.R + (b.R - a.R) * t,
		a.G + (b.G - a.G) * t,
		a.B + (b.B - a.B) * t,
	);
}

export function rgbToHSV(color: Color3): [number, number, number] {
	const r = color.R;
	const g = color.G;
	const b = color.B;

	const max = math.max(r, g, b);
	const min = math.min(r, g, b);
	const delta = max - min;

	let h = 0;
	let s = max === 0 ? 0 : delta / max;
	let v = max;

	if (delta !== 0) {
		if (max === r) {
			h = ((g - b) / delta) % 6;
		} else if (max === g) {
			h = (b - r) / delta + 2;
		} else {
			h = (r - g) / delta + 4;
		}
		h = h * 60;
		if (h < 0) h += 360;
	}

	return [h, s, v];
}

