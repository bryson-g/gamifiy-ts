// Debouncing signals experiment

export class SignalDebouncer<T extends Callback> {
	private timer?: thread;
	private lastArgs?: Parameters<T>;

	constructor(
		private callback: T,
		private delay: number,
	) {}

	public call(...args: Parameters<T>): void {
		this.lastArgs = args;

		if (this.timer) {
			task.cancel(this.timer);
		}

		this.timer = task.delay(this.delay, () => {
			if (this.lastArgs) {
				this.callback(...(this.lastArgs as unknown[]));
			}
			this.timer = undefined;
		});
	}

	public cancel(): void {
		if (this.timer) {
			task.cancel(this.timer);
			this.timer = undefined;
		}
	}

	public flush(): void {
		if (this.timer) {
			task.cancel(this.timer);
			this.timer = undefined;
		}

		if (this.lastArgs) {
			this.callback(...(this.lastArgs as unknown[]));
			this.lastArgs = undefined;
		}
	}
}

export class SignalThrottler<T extends Callback> {
	private isThrottled = false;
	private pendingArgs?: Parameters<T>;

	constructor(
		private callback: T,
		private interval: number,
	) {}

	public call(...args: Parameters<T>): void {
		if (!this.isThrottled) {
			this.callback(...(args as unknown[]));
			this.isThrottled = true;

			task.delay(this.interval, () => {
				this.isThrottled = false;

				if (this.pendingArgs) {
					this.call(...this.pendingArgs);
					this.pendingArgs = undefined;
				}
			});
		} else {
			this.pendingArgs = args;
		}
	}
}

