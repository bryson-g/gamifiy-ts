export function capitalize(str: string): string {
	if (str.size() === 0) return str;
	return str.sub(1, 1).upper() + str.sub(2);
}

export function camelCase(str: string): string {
	return str
		.gsub("[-_](%w)", (match) => match.upper())[0]
		.gsub("^%w", (match) => match.lower())[0];
}

export function kebabCase(str: string): string {
	return str
		.gsub("([A-Z])", (match) => "-" + match.lower())[0]
		.gsub("^-", "")[0];
}

export function snakeCase(str: string): string {
	return str
		.gsub("([A-Z])", (match) => "_" + match.lower())[0]
		.gsub("^_", "")[0];
}

export function padStart(str: string, length: number, char: string = " "): string {
	const padding = math.max(0, length - str.size());
	return char.rep(padding) + str;
}

export function padEnd(str: string, length: number, char: string = " "): string {
	const padding = math.max(0, length - str.size());
	return str + char.rep(padding);
}

