import { AbstractConstructor, Constructor } from "./constructor";
import { HasElementRef } from "./has-element-ref";

export interface CanPlain {
  readonly plain: boolean;
}

type CanPlainCtor = Constructor<CanPlain> & AbstractConstructor<CanPlain>;

export function mixinPlain<T extends AbstractConstructor<HasElementRef>>(
  core: T
): CanPlainCtor & T;
export function mixinPlain<T extends Constructor<HasElementRef>>(
  core: T
): CanPlainCtor & T {
  return class extends core {
    private _plain: boolean = false;

    get plain(): boolean {
      return this._plain
    }

    set isPlain(isPlain: boolean | string) {
      if (typeof isPlain == 'string') this._plain = true;
      else this._plain = isPlain;
      this.updatePlain();
    }

    private updatePlain(): void {
      if (this.plain) {
        this._elementRef.nativeElement.classList.add('plain');
      } else {
        this._elementRef.nativeElement.classList.remove('plain');
      }
    }

    constructor(...args: Array<any>) {
      super(...args);
    }
  }
}
