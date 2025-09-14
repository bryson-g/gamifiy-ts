// Testing command pattern for undo/redo functionality

export interface Command {
	execute(): void;
	undo(): void;
}

export class CommandManager {
	private history: Command[] = [];
	private currentIndex = -1;

	public execute(command: Command): void {
		// Remove any commands after current index
		this.history = this.history.slice(0, this.currentIndex + 1);

		command.execute();
		this.history.push(command);
		this.currentIndex++;
	}

	public undo(): boolean {
		if (!this.canUndo()) return false;

		const command = this.history[this.currentIndex];
		command.undo();
		this.currentIndex--;
		return true;
	}

	public redo(): boolean {
		if (!this.canRedo()) return false;

		this.currentIndex++;
		const command = this.history[this.currentIndex];
		command.execute();
		return true;
	}

	public canUndo(): boolean {
		return this.currentIndex >= 0;
	}

	public canRedo(): boolean {
		return this.currentIndex < this.history.size() - 1;
	}

	public clear(): void {
		this.history = [];
		this.currentIndex = -1;
	}

	public getHistorySize(): number {
		return this.history.size();
	}
}

// Example command implementation
export class ValueChangeCommand<T> implements Command {
	private oldValue: T;

	constructor(
		private getValue: () => T,
		private setValue: (value: T) => void,
		private newValue: T,
	) {
		this.oldValue = getValue();
	}

	public execute(): void {
		this.setValue(this.newValue);
	}

	public undo(): void {
		this.setValue(this.oldValue);
	}
}

