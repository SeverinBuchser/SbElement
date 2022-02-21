import { AbstractConstructor, Constructor } from "./constructor";
import { HasElementRef } from "./has-element-ref";

export interface CanHide {
  visible: boolean;
  transitionDuration: number;
  defaultVisiblity?: boolean;
}

type CanHideCtor = Constructor<CanHide> & AbstractConstructor<CanHide>;

export function mixinHide<T extends AbstractConstructor<HasElementRef>>(
  core: T,
  transitionDuration?: number,
  defaultVisiblity?: boolean
): CanHideCtor & T;
export function mixinHide<T extends Constructor<HasElementRef>>(
  core: T,
  transitionDuration?: number,
  defaultVisiblity?: boolean
): CanHideCtor & T {
  return class extends core {
    private _visible: boolean | undefined;
    public defaultVisiblity?: boolean = defaultVisiblity;
    public transitionDuration: number = transitionDuration || 0;

    get visible(): boolean {
      return this._visible || false;
    }
    set visible(isVisible: boolean) {
      if (isVisible !== this._visible) {
        if (isVisible) this.show(this._visible !== undefined);
        else this.hide(this._visible !== undefined);
        this._visible = isVisible;
      }
    }

    private wait(): Promise<void> {
      return new Promise(resolve => {
        setTimeout(() => resolve(), this.transitionDuration)
      })
    }

    private async show(transition: boolean): Promise<void> {
      this._elementRef.nativeElement.classList.remove(`sb--hide`);
      if (transition) {
        this._elementRef.nativeElement.classList.add(`sb--showing`);
        await this.wait();
        this._elementRef.nativeElement.classList.remove(`sb--showing`);
      }
      this._elementRef.nativeElement.classList.add(`sb--show`);
    }

    private async hide(transition: boolean): Promise<void> {
      this._elementRef.nativeElement.classList.remove(`sb--show`);
      if (transition) {
        this._elementRef.nativeElement.classList.add(`sb--hiding`);
        await this.wait();
        this._elementRef.nativeElement.classList.remove(`sb--hiding`);
      }
      this._elementRef.nativeElement.classList.add(`sb--hide`);

    }

    constructor(...args: Array<any>) {
      super(...args);

      this.visible = defaultVisiblity || true;
    }
  }
}
