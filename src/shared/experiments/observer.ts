// Experimental observer pattern implementation

interface Observer<T> {
	update(data: T): void;
}

export class Observable<T> {
	private observers: Set<Observer<T>> = new Set();

	public subscribe(observer: Observer<T>): () => void {
		this.observers.add(observer);
		return () => this.unsubscribe(observer);
	}

	public unsubscribe(observer: Observer<T>): void {
		this.observers.delete(observer);
	}

	public notify(data: T): void {
		this.observers.forEach((observer) => observer.update(data));
	}

	public getObserverCount(): number {
		return this.observers.size();
	}
}

// Simple observable value wrapper
export class ObservableValue<T> extends Observable<T> {
	constructor(private _value: T) {
		super();
	}

	public get value(): T {
		return this._value;
	}

	public set value(newValue: T) {
		if (this._value !== newValue) {
			this._value = newValue;
			this.notify(newValue);
		}
	}
}

