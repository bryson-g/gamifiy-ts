import { UserInputService } from "@rbxts/services";

export function getViewportSize(): Vector2 {
	const camera = game.Workspace.CurrentCamera;
	return camera ? camera.ViewportSize : new Vector2(800, 600);
}

export function isMobile(): boolean {
	return UserInputService.TouchEnabled && !UserInputService.KeyboardEnabled;
}

export function isDesktop(): boolean {
	return UserInputService.KeyboardEnabled && UserInputService.MouseEnabled;
}

export function getDeviceType(): "mobile" | "tablet" | "desktop" {
	if (!UserInputService.TouchEnabled) return "desktop";
	
	const viewportSize = getViewportSize();
	const minDimension = math.min(viewportSize.X, viewportSize.Y);
	
	if (minDimension < 600) return "mobile";
	return "tablet";
}

