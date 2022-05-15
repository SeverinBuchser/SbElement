import { SbConnectedSide } from "../position";

export type SbFlexibleAlignment = 'start' | 'center' | 'end' | number

export interface SbFlexibleConnectedPositionConfig {
	originSide: SbConnectedSide;
	overlayAlignment: SbFlexibleAlignment;
	margin?: number;
}

export const defaultFlexibleConnectedPositionConfig: SbFlexibleConnectedPositionConfig = {
	originSide: 'bottom',
	overlayAlignment: 'center'
}

export function validateFlexibleConnectedPositionConfig(
	positionConfig: SbFlexibleConnectedPositionConfig
): void {
	validateConnectedSide('originSide', positionConfig.originSide);
	validateFlexibleAlignment('overlayAlignment', positionConfig.overlayAlignment);
}

function validateConnectedSide(
	property: string,
	value: SbConnectedSide
): void {
	if (value !== 'top' && value !== 'bottom' && value !== 'left' && value !== 'right') {
		throw new Error(
			`SbConnectedPositionSide: Invalid ${property} "${value}". ` +
			`Expected "top", "bottom", "left" or "right".`
		);
	}
}

function validateFlexibleAlignment(
	property: string,
	value: SbFlexibleAlignment
): void {
	if (
		value !== 'start' && value !== 'end' && value !== 'center' &&
		typeof value !== 'number'
	) {
    throw new Error(
			`SbConnectedPositionAlignment: Invalid ${property} "${value}". ` +
      `Expected "start", "end", "center" or a number.`,
    );
  }
}

export function getFlexibleAlignment(
	positionConfig: SbFlexibleConnectedPositionConfig
): number {
	let overlayAlignment: number = -1;
	if (positionConfig.overlayAlignment == 'start') {
		overlayAlignment = -1;
	} else if (positionConfig.overlayAlignment == 'center') {
		overlayAlignment =  0;
	} else if (positionConfig.overlayAlignment == 'end') {
		overlayAlignment =  1;
	} else if (typeof positionConfig.overlayAlignment == 'number') {
		overlayAlignment =  Math.max(-1, Math.min(1, positionConfig.overlayAlignment))
	}

	return overlayAlignment;
}

export function calculateFlexibleAlignment(
	positionConfig: SbFlexibleConnectedPositionConfig,
	dimension: number
): number {
	let alignement = getFlexibleAlignment(positionConfig);
	return (alignement + 1) / 2 * dimension;
}
