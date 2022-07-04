export type GeneratorFunction = () => string;

export interface Generatable {
  generate(): string;
}

export function toGeneratable(generator: string | GeneratorFunction): Generatable {
  if (typeof generator == 'string') {
    return toGeneratable(() => generator)
  } else {
    return {
      generate: generator
    }
  }
}