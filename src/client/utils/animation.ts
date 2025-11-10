import { TweenService } from "@rbxts/services";

export function fadeIn(instance: GuiObject, duration: number = 0.3): Tween {
	const tween = TweenService.Create(instance, new TweenInfo(duration), {
		BackgroundTransparency: 0,
	});
	tween.Play();
	return tween;
}

export function fadeOut(instance: GuiObject, duration: number = 0.3): Tween {
	const tween = TweenService.Create(instance, new TweenInfo(duration), {
		BackgroundTransparency: 1,
	});
	tween.Play();
	return tween;
}

export function scaleUp(instance: GuiObject, targetScale: number = 1, duration: number = 0.2): Tween {
	const tween = TweenService.Create(instance, new TweenInfo(duration, Enum.EasingStyle.Back), {
		Size: new UDim2(targetScale, 0, targetScale, 0),
	});
	tween.Play();
	return tween;
}

export function slideIn(instance: GuiObject, direction: "left" | "right" | "top" | "bottom", duration: number = 0.3): Tween {
	const targetPosition = instance.Position;
	
	const tween = TweenService.Create(instance, new TweenInfo(duration, Enum.EasingStyle.Quad), {
		Position: targetPosition,
	});
	tween.Play();
	return tween;
}

