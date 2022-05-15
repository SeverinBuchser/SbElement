export function extendStyles(
  destination: CSSStyleDeclaration,
  source: CSSStyleDeclaration,
): CSSStyleDeclaration {
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      destination[key] = source[key];
    }
  }

  return destination;
}
