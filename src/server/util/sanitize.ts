export function sanitizeInput(input: string): string {
	return input.gsub("[<>]", "")[0];
}

export function truncateString(str: string, maxLength: number): string {
	if (str.size() <= maxLength) return str;
	return str.sub(1, maxLength) + "...";
}

export function escapePattern(pattern: string): string {
	return pattern.gsub("([%^%$%(%)%%%.%[%]%*%+%-%?])", "%%%1")[0];
}

