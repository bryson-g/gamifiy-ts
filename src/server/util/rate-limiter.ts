interface RateLimitEntry {
	count: number;
	resetTime: number;
}

export class RateLimiter {
	private limits = new Map<string, RateLimitEntry>();

	constructor(
		private maxRequests: number,
		private windowSeconds: number,
	) {}

	public check(identifier: string): boolean {
		const now = tick();
		const entry = this.limits.get(identifier);

		if (!entry || now >= entry.resetTime) {
			this.limits.set(identifier, {
				count: 1,
				resetTime: now + this.windowSeconds,
			});
			return true;
		}

		if (entry.count < this.maxRequests) {
			entry.count++;
			return true;
		}

		return false;
	}

	public reset(identifier: string): void {
		this.limits.delete(identifier);
	}

	public cleanup(): void {
		const now = tick();
		for (const [key, entry] of this.limits) {
			if (now >= entry.resetTime) {
				this.limits.delete(key);
			}
		}
	}
}

