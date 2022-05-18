export interface SbDimensions {
	width: number;
	height: number;
	left: number;
	right: number;
	top: number;
	bottom: number;
}

export function mergeDimensions(
	source: SbDimensions,
	insert: Partial<SbDimensions>
): SbDimensions {
	return {
		top: insert.top !== undefined ? insert.top : source.top,
		bottom:insert.bottom !== undefined ? insert.bottom : source.bottom,
		left: insert.left !== undefined ? insert.left : source.left,
		right: insert.right !== undefined ? insert.right : source.right,
		height: insert.height !== undefined ? insert.height : source.height,
		width: insert.width !== undefined ? insert.width : source.width,
	}
}
