import { UserInputService } from "@rbxts/services";

export function isKeyDown(keyCode: Enum.KeyCode): boolean {
	return UserInputService.IsKeyDown(keyCode);
}

export function isMouseButtonPressed(button: Enum.UserInputType): boolean {
	return UserInputService.IsMouseButtonPressed(button);
}

export function getMouseLocation(): Vector2 {
	return UserInputService.GetMouseLocation();
}

export function onInputBegan(callback: (input: InputObject) => void): RBXScriptConnection {
	return UserInputService.InputBegan.Connect(callback);
}

export function onInputEnded(callback: (input: InputObject) => void): RBXScriptConnection {
	return UserInputService.InputEnded.Connect(callback);
}

export function isShiftDown(): boolean {
	return isKeyDown(Enum.KeyCode.LeftShift) || isKeyDown(Enum.KeyCode.RightShift);
}

export function isControlDown(): boolean {
	return isKeyDown(Enum.KeyCode.LeftControl) || isKeyDown(Enum.KeyCode.RightControl);
}

export function isAltDown(): boolean {
	return isKeyDown(Enum.KeyCode.LeftAlt) || isKeyDown(Enum.KeyCode.RightAlt);
}

