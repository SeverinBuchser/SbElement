import { strings } from '@angular-devkit/core';

export function sbStylize(string: string): string {
	return `_${strings.dasherize(string)}`;
}

export function sbClassify(string: string): string {
	return `Sb${strings.classify(string)}`;
}

export function sbCorify(string: string): string {
	return `${sbClassify(string)}Core`;
}

export function sbComponentify(string: string): string {
	return `${sbClassify(string)}Component`;
}

export function sbDasherize(string: string): string {
	return `sb-${strings.dasherize(string)}`;
}
