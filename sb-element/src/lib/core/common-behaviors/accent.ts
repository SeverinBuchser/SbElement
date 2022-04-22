import { AbstractConstructor, Constructor } from "./constructor";
import { HasElementRef } from "./has-element-ref";

export interface CanAccent {
  readonly accent: boolean;
}

type CanAccentCtor = Constructor<CanAccent> & AbstractConstructor<CanAccent>;

export function mixinAccent<T extends AbstractConstructor<HasElementRef>>(
  core: T
): CanAccentCtor & T;
export function mixinAccent<T extends Constructor<HasElementRef>>(
  core: T
): CanAccentCtor & T {
  return class extends core {
    private _accent: boolean = false;

    get accent(): boolean {
      return this._accent
    }

    set isAccent(isAccent: boolean | string) {
      if (typeof isAccent == 'string') this._accent = true;
      else this._accent = isAccent;
      this.updateAccent();
    }

    private updateAccent(): void {
      if (this.accent) {
        this._elementRef.nativeElement.classList.add('accent');
      } else {
        this._elementRef.nativeElement.classList.remove('accent');
      }
    }

    constructor(...args: Array<any>) {
      super(...args);
    }
  }
}
