import { AbstractConstructor, Constructor } from "./constructor";

export interface CanDisable {
  disabled: boolean;
  setDisabledState(isDisabled: boolean): void;
}

type CanDisableCtor = Constructor<CanDisable> & AbstractConstructor<CanDisable>;

export function mixinDisable<T extends AbstractConstructor<{}>>(
  core: T,
): CanDisableCtor & T;
export function mixinDisable<T extends Constructor<{}>>(
  core: T,
): CanDisableCtor & T {
  return class extends core {
    private _disabled: boolean = false;

    get disabled(): boolean {
      return this._disabled;
    }
    set disabled(isDisabled: boolean) {
      this._disabled = isDisabled;
    }

    public setDisabledState(isDisabled: boolean): void {
      this.disabled = isDisabled;
    }

    constructor(...args: Array<any>) {
      super(...args);
    }
  }
}
