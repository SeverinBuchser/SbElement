import { EventEmitter } from "@angular/core";
import { AbstractConstructor, Constructor } from "./constructor";

export interface CanFocus {
  focused: boolean;
  focus: EventEmitter<void>;
  blur: EventEmitter<void>;
  setFocusedState(isFocused: boolean): void;
}

type CanFocusCtor = Constructor<CanFocus> & AbstractConstructor<CanFocus>;

export function mixinFocus<T extends AbstractConstructor<{}>>(
  core: T
): CanFocusCtor & T;
export function mixinFocus<T extends Constructor<{}>>(
  core: T
): CanFocusCtor & T {
  return class extends core {
    private _focused: boolean = false;

    public focus: EventEmitter<void> = new EventEmitter<void>();
    public blur: EventEmitter<void> = new EventEmitter<void>();

    get focused(): boolean {
      return this._focused;
    }
    set focused(isFocused: boolean) {
      if (isFocused !== this._focused) {
        if (isFocused) {
          this.emitFocus();
        } else {
          this.emitBlur();
        }
      }
      this._focused = isFocused;
    }

    public setFocusedState(isFocused: boolean): void {
      this.focused = isFocused;
    }

    private emitFocus(): void {
      this.onFocus();
      this.focus.emit();
    }

    private emitBlur(): void {
      this.onBlur();
      this.blur.emit();
    }

    protected onFocus(): void {};
    protected onBlur(): void {};

    constructor(...args: Array<any>) {
      super(...args);
    }
  }
}
