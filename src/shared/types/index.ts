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

