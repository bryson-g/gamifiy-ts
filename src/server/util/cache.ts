interface CacheEntry<T> {
	value: T;
	expiry: number;
}

export class Cache<T> {
	private store = new Map<string, CacheEntry<T>>();

	constructor(private defaultTTL: number = 60) {}

	public set(key: string, value: T, ttl?: number): void {
		const expiry = tick() + (ttl ?? this.defaultTTL);
		this.store.set(key, { value, expiry });
	}

	public get(key: string): T | undefined {
		const entry = this.store.get(key);
		if (!entry) return undefined;

		if (tick() >= entry.expiry) {
			this.store.delete(key);
			return undefined;
		}

		return entry.value;
	}

	public has(key: string): boolean {
		return this.get(key) !== undefined;
	}

	public delete(key: string): void {
		this.store.delete(key);
	}

	public clear(): void {
		this.store.clear();
	}

	public cleanup(): void {
		const now = tick();
		for (const [key, entry] of this.store) {
			if (now >= entry.expiry) {
				this.store.delete(key);
			}
		}
	}
}

