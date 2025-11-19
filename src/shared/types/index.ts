export interface Vec3 {
	x: number;
	y: number;
	z: number;
}

export interface RGB {
	r: number;
	g: number;
	b: number;
}

export type Timestamp = number;

export interface PaginationParams {
	page: number;
	limit: number;
}

export interface SortParams {
	field: string;
	order: "asc" | "desc";
}

export interface Result<T, E = string> {
	success: boolean;
	value?: T;
	error?: E;
}

export type Callback<T extends unknown[] = []> = (...args: T) => void;

export type AsyncCallback<T extends unknown[] = [], R = void> = (...args: T) => Promise<R>;

