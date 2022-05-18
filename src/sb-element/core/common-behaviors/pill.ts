import { AbstractConstructor, Constructor } from "./constructor";
import { HasElementRef } from "./has-element-ref";

export interface CanPill {
  readonly pill: boolean;
  set isPill(isPill: boolean | string);
}

type CanPillCtor = Constructor<CanPill> & AbstractConstructor<CanPill>;

export function mixinPill<T extends AbstractConstructor<HasElementRef>>(
  core: T,
  isPillInital?: boolean
): CanPillCtor & T;
export function mixinPill<T extends Constructor<HasElementRef>>(
  core: T,
  isPillInital: boolean = false
): CanPillCtor & T {
  return class extends core {
    private _pill: boolean = false;

    get pill(): boolean {
      return this._pill
    }

    set isPill(isPill: boolean | string) {
      if (typeof isPill == 'string') this._pill = true;
      else this._pill = isPill;
      this.updatePill();
    }

    private updatePill(): void {
      if (this.pill) {
        this._elementRef.nativeElement.classList.add('pill');
      } else {
        this._elementRef.nativeElement.classList.remove('pill');
      }
    }

    constructor(...args: Array<any>) {
      super(...args);

      this.isPill = isPillInital;
    }
  }
}
