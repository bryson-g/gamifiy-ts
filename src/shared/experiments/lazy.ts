// Lazy initialization pattern experiment

export class Lazy<T> {
	private value?: T;
	private initialized = false;

	constructor(private initializer: () => T) {}

	public getValue(): T {
		if (!this.initialized) {
			this.value = this.initializer();
			this.initialized = true;
		}
		return this.value!;
	}

	public isInitialized(): boolean {
		return this.initialized;
	}

	public reset(): void {
		this.value = undefined;
		this.initialized = false;
	}
}

// Async version
export class AsyncLazy<T> {
	private promise?: Promise<T>;
	private value?: T;
	private initialized = false;

	constructor(private initializer: () => Promise<T>) {}

	public async getValue(): Promise<T> {
		if (!this.initialized) {
			if (!this.promise) {
				this.promise = this.initializer();
			}
			this.value = await this.promise;
			this.initialized = true;
		}
		return this.value!;
	}

	public isInitialized(): boolean {
		return this.initialized;
	}

	public reset(): void {
		this.promise = undefined;
		this.value = undefined;
		this.initialized = false;
	}
}

// Helper function
export function lazy<T>(initializer: () => T): Lazy<T> {
	return new Lazy(initializer);
}

export function asyncLazy<T>(initializer: () => Promise<T>): AsyncLazy<T> {
	return new AsyncLazy(initializer);
}

