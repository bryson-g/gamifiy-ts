type EventCallback<T = unknown> = (data: T) => void;

export class EventEmitter<TEvents extends Record<string, unknown> = Record<string, unknown>> {
	private listeners = new Map<keyof TEvents, Set<EventCallback<TEvents[keyof TEvents]>>>();

	public on<K extends keyof TEvents>(event: K, callback: EventCallback<TEvents[K]>): () => void {
		if (!this.listeners.has(event)) {
			this.listeners.set(event, new Set());
		}

		const callbacks = this.listeners.get(event)!;
		callbacks.add(callback as EventCallback<TEvents[keyof TEvents]>);

		return () => this.off(event, callback);
	}

	public once<K extends keyof TEvents>(event: K, callback: EventCallback<TEvents[K]>): () => void {
		const wrapper = (data: TEvents[K]) => {
			callback(data);
			this.off(event, wrapper);
		};

		return this.on(event, wrapper);
	}

	public off<K extends keyof TEvents>(event: K, callback: EventCallback<TEvents[K]>): void {
		const callbacks = this.listeners.get(event);
		if (callbacks) {
			callbacks.delete(callback as EventCallback<TEvents[keyof TEvents]>);
		}
	}

	public emit<K extends keyof TEvents>(event: K, data: TEvents[K]): void {
		const callbacks = this.listeners.get(event);
		if (callbacks) {
			callbacks.forEach((callback) => callback(data));
		}
	}

	public removeAllListeners(event?: keyof TEvents): void {
		if (event) {
			this.listeners.delete(event);
		} else {
			this.listeners.clear();
		}
	}
}

