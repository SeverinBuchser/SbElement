import { FileDoesNotExistException, Tree } from "@angular-devkit/schematics";

export function read(host: Tree, path: string) {
	const data = host.read(path);
	if (data === null) {
		throw new FileDoesNotExistException(path);
	}

	const decoder = new TextDecoder('utf-8', { fatal: true });
	let sourceText;
	try {
		sourceText = decoder.decode(data);
	} catch (e) {
		if (e instanceof TypeError) {
			throw new Error(`Failed to decode "${path}" as UTF-8 text.`);
		}
		throw e;
	}
	return sourceText;
}
