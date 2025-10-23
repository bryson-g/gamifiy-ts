const STORAGE_PREFIX = "rbxts_";

export function setLocalData<T>(key: string, value: T): void {
	const fullKey = STORAGE_PREFIX + key;
	// Storage implementation would go here
	print(`[Storage] Set ${fullKey}:`, value);
}

export function getLocalData<T>(key: string, defaultValue: T): T {
	const fullKey = STORAGE_PREFIX + key;
	// Storage implementation would go here
	print(`[Storage] Get ${fullKey}`);
	return defaultValue;
}

export function removeLocalData(key: string): void {
	const fullKey = STORAGE_PREFIX + key;
	// Storage implementation would go here
	print(`[Storage] Remove ${fullKey}`);
}

export function clearAllLocalData(): void {
	// Storage implementation would go here
	print("[Storage] Clear all data");
}

