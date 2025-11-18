export class Queue<T> {
	private items: T[] = [];

	public enqueue(item: T): void {
		this.items.push(item);
	}

	public dequeue(): T | undefined {
		return this.items.shift();
	}

	public peek(): T | undefined {
		return this.items[0];
	}

	public size(): number {
		return this.items.size();
	}

	public isEmpty(): boolean {
		return this.items.size() === 0;
	}

	public clear(): void {
		this.items = [];
	}

	public toArray(): T[] {
		return [...this.items];
	}
}

export class PriorityQueue<T> {
	private items: Array<{ item: T; priority: number }> = [];

	public enqueue(item: T, priority: number): void {
		const newItem = { item, priority };
		let added = false;

		for (let i = 0; i < this.items.size(); i++) {
			if (priority < this.items[i].priority) {
				this.items.insert(i, newItem);
				added = true;
				break;
			}
		}

		if (!added) {
			this.items.push(newItem);
		}
	}

	public dequeue(): T | undefined {
		const item = this.items.shift();
		return item?.item;
	}

	public peek(): T | undefined {
		return this.items[0]?.item;
	}

	public size(): number {
		return this.items.size();
	}

	public isEmpty(): boolean {
		return this.items.size() === 0;
	}

	public clear(): void {
		this.items = [];
	}
}

