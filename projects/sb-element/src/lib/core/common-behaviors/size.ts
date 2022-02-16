import { AbstractConstructor, Constructor } from "./constructor";
import { HasElementRef } from "./has-element-ref";


export enum Size {
  SMALL = 's',
  DEFAULT = 'd',
  MEDIUM = 'm',
  LARGE = 'l'
}

export interface CanSize {
  size: Size | undefined;
  defaultSize?: Size;
}

type CanSizeCtor = Constructor<CanSize> & AbstractConstructor<CanSize>;

export function mixinSize<T extends AbstractConstructor<HasElementRef>>(
  core: T,
  defaultSize?: Size
): CanSizeCtor & T;
export function mixinSize<T extends Constructor<HasElementRef>>(
  core: T,
  defaultSize?: Size
): CanSizeCtor & T {
  return class extends core {
    private _size: Size | undefined;
    public defaultSize = defaultSize;


    get size(): Size | undefined {
      return this._size;
    }
    set size(value: Size | undefined) {
      const size = value || this.defaultSize;

      if (size !== this._size) {
        if (this._size) {
          this._elementRef.nativeElement.classList.remove(`sb--${this._size}`);
        }
        if (size) {
          this._elementRef.nativeElement.classList.add(`sb--${size}`);
        }

        this._size = size;
      }
    }

    constructor(...args: Array<any>) {
      super(...args);

      this.size = defaultSize;
    }
  }
}
