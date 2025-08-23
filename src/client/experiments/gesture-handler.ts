// Weekend experiment: gesture detection

import { UserInputService } from "@rbxts/services";

interface TouchData {
	position: Vector2;
	timestamp: number;
}

export class GestureHandler {
	private touchStart?: TouchData;
	private touchEnd?: TouchData;

	private swipeThreshold = 50;
	private swipeTimeLimit = 0.5;

	public onSwipe?: (direction: "up" | "down" | "left" | "right") => void;
	public onTap?: (position: Vector2) => void;
	public onLongPress?: (position: Vector2) => void;

	private longPressTimer?: thread;
	private longPressDelay = 0.5;

	public init(): void {
		UserInputService.TouchStarted.Connect((touch) => {
			this.handleTouchStart(touch.Position);
		});

		UserInputService.TouchEnded.Connect((touch) => {
			this.handleTouchEnd(touch.Position);
		});
	}

	private handleTouchStart(position: Vector3): void {
		const pos2D = new Vector2(position.X, position.Y);
		this.touchStart = {
			position: pos2D,
			timestamp: tick(),
		};

		// Start long press timer
		if (this.longPressTimer) {
			task.cancel(this.longPressTimer);
		}

		this.longPressTimer = task.delay(this.longPressDelay, () => {
			if (this.touchStart) {
				this.onLongPress?.(pos2D);
			}
		});
	}

	private handleTouchEnd(position: Vector3): void {
		const pos2D = new Vector2(position.X, position.Y);
		this.touchEnd = {
			position: pos2D,
			timestamp: tick(),
		};

		// Cancel long press
		if (this.longPressTimer) {
			task.cancel(this.longPressTimer);
		}

		if (!this.touchStart) return;

		const deltaTime = this.touchEnd.timestamp - this.touchStart.timestamp;
		const deltaPos = this.touchEnd.position.sub(this.touchStart.position);
		const distance = deltaPos.Magnitude;

		if (distance < 10 && deltaTime < 0.3) {
			// Tap detected
			this.onTap?.(pos2D);
		} else if (distance > this.swipeThreshold && deltaTime < this.swipeTimeLimit) {
			// Swipe detected
			const direction = this.getSwipeDirection(deltaPos);
			this.onSwipe?.(direction);
		}

		this.touchStart = undefined;
		this.touchEnd = undefined;
	}

	private getSwipeDirection(delta: Vector2): "up" | "down" | "left" | "right" {
		const absX = math.abs(delta.X);
		const absY = math.abs(delta.Y);

		if (absX > absY) {
			return delta.X > 0 ? "right" : "left";
		} else {
			return delta.Y > 0 ? "down" : "up";
		}
	}
}

