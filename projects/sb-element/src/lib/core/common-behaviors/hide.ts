import { ElementRef, EventEmitter } from "@angular/core";
import { AbstractConstructor, Constructor } from "./constructor";
import { HasElementRef } from "./has-element-ref";

export interface CanHide {
  visible: boolean;
  setVisibleState(isVisible: boolean): void;
  show: EventEmitter<void>;
  hide: EventEmitter<void>;
  transitionDuration: number;
  transitionElement?: ElementRef;
  defaultVisiblity?: boolean;
  wait(time: number): Promise<void>;
}

type CanHideCtor = Constructor<CanHide> & AbstractConstructor<CanHide>;

export function mixinHide<T extends AbstractConstructor<HasElementRef>>(
  core: T,
  defaultVisiblity?: boolean
): CanHideCtor & T;
export function mixinHide<T extends Constructor<HasElementRef>>(
  core: T,
  defaultVisiblity?: boolean
): CanHideCtor & T {
  return class extends core {
    private _visible: boolean | undefined;

    public show: EventEmitter<void> = new EventEmitter<void>();
    public hide: EventEmitter<void> = new EventEmitter<void>();

    public defaultVisiblity?: boolean = defaultVisiblity;
    public transitionElement?: ElementRef;

    get visible(): boolean {
      return this._visible || false;
    }
    set visible(isVisible: boolean) {
      if (isVisible !== this._visible) {
        if (isVisible) this.showElement();
        else this.hideElement(this._visible);
        this._visible = isVisible;
      }
    }

    public wait(time: number): Promise<void> {
      return new Promise(resolve => {
        setTimeout(() => resolve(), time)
      })
    }

    private async showElement(): Promise<void> {
      this._elementRef.nativeElement.classList.remove(`sb--hide`);
      setTimeout(() => {
        this._elementRef.nativeElement.classList.add(`sb--show`);
        this.emitShow();
      }, 0);
    }

    private async hideElement(wasVisible: boolean | undefined): Promise<void> {
      this._elementRef.nativeElement.classList.remove(`sb--show`);
      if (wasVisible !== undefined) {
        this._elementRef.nativeElement.classList.add(`sb--hiding`);
        await this.wait(this.transitionDuration + 5);
        this._elementRef.nativeElement.classList.remove(`sb--hiding`);
      }
      if (wasVisible == undefined || this._visible == false) {
        this._elementRef.nativeElement.classList.add(`sb--hide`);
        this.emitHide();
      }
    }

    get transitionDuration(): number {
      if (!this.transitionElement) return 0;

      let {
        transitionDuration,
        transitionDelay
      } = window.getComputedStyle(this.transitionElement.nativeElement);
      const floatTransitionDuration = parseFloat(transitionDuration);
      const floatTransitionDelay = parseFloat(transitionDelay);

      if (!floatTransitionDuration && !floatTransitionDelay) return 0;

      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * 1000;
    }

    public setVisibleState(isVisible: boolean): void {
      this.visible = isVisible;
    }

    private emitShow(): void {
      this.onShow();
      this.show.emit();
    }

    private emitHide(): void {
      this.onHide();
      this.hide.emit();
    }

    protected onShow(): void {};
    protected onHide(): void {};

    constructor(...args: Array<any>) {
      super(...args);

      this.visible = defaultVisiblity || false;
    }
  }
}
