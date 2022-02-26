import { AbstractConstructor, Constructor } from "./constructor";
import { HasElementRef } from "./has-element-ref";


export enum Color {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  WARN = 'warn',
  INFO = 'info'
}

export interface CanColor {
  color: Color | undefined;
  defaultColor?: Color;
}

type CanColorCtor = Constructor<CanColor> & AbstractConstructor<CanColor>;

export function mixinColor<T extends AbstractConstructor<HasElementRef>>(
  core: T,
  defaultColor?: Color
): CanColorCtor & T;
export function mixinColor<T extends Constructor<HasElementRef>>(
  core: T,
  defaultColor?: Color
): CanColorCtor & T {
  return class extends core {
    private _color: Color | undefined;
    public defaultColor?: Color = defaultColor;


    get color(): Color | undefined {
      return this._color;
    }
    set color(value: Color | undefined) {
      const color = value || this.defaultColor;

      if (color !== this._color) {
        if (this._color) {
          this._elementRef.nativeElement.classList.remove(`sb--${this._color}`);
        }
        if (color) {
          this._elementRef.nativeElement.classList.add(`sb--${color}`);
        }

        this._color = color;
      }
    }

    constructor(...args: Array<any>) {
      super(...args);

      this.color = defaultColor;
    }
  }
}
