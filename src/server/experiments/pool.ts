// Object pool experiment for performance optimization

export class ObjectPool<T> {
	private available: T[] = [];
	private inUse = new Set<T>();

	constructor(
		private factory: () => T,
		private reset: (obj: T) => void,
		initialSize: number = 10,
	) {
		for (let i = 0; i < initialSize; i++) {
			this.available.push(this.factory());
		}
	}

	public acquire(): T {
		let obj: T;

		if (this.available.size() > 0) {
			obj = this.available.pop()!;
		} else {
			obj = this.factory();
		}

		this.inUse.add(obj);
		return obj;
	}

	public release(obj: T): void {
		if (!this.inUse.has(obj)) {
			warn("Attempting to release object not in use");
			return;
		}

		this.inUse.delete(obj);
		this.reset(obj);
		this.available.push(obj);
	}

	public clear(): void {
		this.available = [];
		this.inUse.clear();
	}

	public getPoolSize(): number {
		return this.available.size() + this.inUse.size();
	}

	public getAvailableCount(): number {
		return this.available.size();
	}

	public getInUseCount(): number {
		return this.inUse.size();
	}
}

// Specialized pool for parts
export class PartPool extends ObjectPool<BasePart> {
	constructor(template: BasePart, parent: Instance, initialSize: number = 10) {
		super(
			() => {
				const part = template.Clone();
				part.Parent = parent;
				return part;
			},
			(part) => {
				part.CFrame = new CFrame(0, 0, 0);
				part.Anchored = true;
				part.CanCollide = false;
				part.Transparency = 1;
			},
			initialSize,
		);
	}
}

