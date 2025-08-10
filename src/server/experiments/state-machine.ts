// Playing around with state machine pattern

type StateName = string;

interface StateDefinition<TContext> {
	onEnter?: (context: TContext) => void;
	onExit?: (context: TContext) => void;
	transitions?: Map<string, StateName>;
}

export class StateMachine<TContext> {
	private states = new Map<StateName, StateDefinition<TContext>>();
	private currentState?: StateName;

	constructor(private context: TContext) {}

	public addState(name: StateName, definition: StateDefinition<TContext>): this {
		this.states.set(name, definition);
		return this;
	}

	public transition(event: string): boolean {
		if (!this.currentState) return false;

		const state = this.states.get(this.currentState);
		if (!state?.transitions) return false;

		const nextState = state.transitions.get(event);
		if (!nextState) return false;

		// Exit current state
		state.onExit?.(this.context);

		// Enter new state
		this.currentState = nextState;
		const newState = this.states.get(nextState);
		newState?.onEnter?.(this.context);

		return true;
	}

	public start(initialState: StateName): void {
		this.currentState = initialState;
		const state = this.states.get(initialState);
		state?.onEnter?.(this.context);
	}

	public getCurrentState(): StateName | undefined {
		return this.currentState;
	}
}

