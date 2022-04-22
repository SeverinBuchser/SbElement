import { AbstractConstructor, Constructor } from "./constructor";
import { HasElementRef } from "./has-element-ref";

export interface CanRound {
  readonly round: boolean;
}

type CanRoundCtor = Constructor<CanRound> & AbstractConstructor<CanRound>;

export function mixinRound<T extends AbstractConstructor<HasElementRef>>(
  core: T
): CanRoundCtor & T;
export function mixinRound<T extends Constructor<HasElementRef>>(
  core: T
): CanRoundCtor & T {
  return class extends core {
    private _round: boolean = false;

    get round(): boolean {
      return this._round
    }

    set isRound(isRound: boolean | string) {
      if (typeof isRound == 'string') this._round = true;
      else this._round = isRound;
      this.updateRound();
    }

    private updateRound(): void {
      if (this.round) {
        this._elementRef.nativeElement.classList.add('round');
      } else {
        this._elementRef.nativeElement.classList.remove('round');
      }
    }

    constructor(...args: Array<any>) {
      super(...args);
    }
  }
}
