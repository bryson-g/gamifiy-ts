import Log, { Logger } from "@rbxts/log";

export const logger = Log.ForContext("rbxts-dev");

export function logDebug(message: string, ...args: unknown[]) {
	logger.Debug(message, ...args);
}

export function logInfo(message: string, ...args: unknown[]) {
	logger.Info(message, ...args);
}

export function logWarning(message: string, ...args: unknown[]) {
	logger.Warn(message, ...args);
}

export function logError(message: string, ...args: unknown[]) {
	logger.Error(message, ...args);
}
