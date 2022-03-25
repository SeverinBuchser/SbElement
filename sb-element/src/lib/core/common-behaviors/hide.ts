import { ElementRef, EventEmitter } from "@angular/core";
import { AbstractConstructor, Constructor } from "./constructor";
import { HasElementRef } from "./has-element-ref";

export interface CanHide {
  visible: boolean;
  setVisibleState(isVisible: boolean): void;
  showStart: EventEmitter<void>;
  showEnd: EventEmitter<void>;
  hideStart: EventEmitter<void>;
  hideEnd: EventEmitter<void>;
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
    private padding: number = 5;
    private _visible: boolean | undefined;

    public showStart: EventEmitter<void> = new EventEmitter<void>();
    public showEnd: EventEmitter<void> = new EventEmitter<void>();
    public hideStart: EventEmitter<void> = new EventEmitter<void>();
    public hideEnd: EventEmitter<void> = new EventEmitter<void>();

    public defaultVisiblity?: boolean = defaultVisiblity;
    public transitionElement?: ElementRef;

    get visible(): boolean {
      return this._visible || false;
    }
    set visible(isVisible: boolean) {
      if (isVisible !== this._visible) {
        if (isVisible) this.showElement(this._visible);
        else this.hideElement(this._visible);
        this._visible = isVisible;
      }
    }

    public wait(time: number): Promise<void> {
      return new Promise(resolve => {
        let timeout = setTimeout(() => {
          resolve();
          clearTimeout(timeout);
        }, time)
      })
    }

    private async showElement(wasVisible: boolean | undefined): Promise<void> {
      this._elementRef.nativeElement.classList.remove(`sb--hidden`);
      if (wasVisible !== undefined) {
        this._elementRef.nativeElement.classList.add(`sb--visibly-hidden`);
        await this.wait(this.padding);
        this._elementRef.nativeElement.classList.remove(`sb--visibly-hidden`);
      }
      this.emitShowStart();
      this._elementRef.nativeElement.classList.add(`sb--visible`);
      await this.wait(this.transitionDuration + this.padding);
      this.emitShowEnd();
    }

    private async hideElement(wasVisible: boolean | undefined): Promise<void> {
      this._elementRef.nativeElement.classList.remove(`sb--visible`);
      this.emitHideStart();
      if (wasVisible !== undefined) {
        this._elementRef.nativeElement.classList.add(`sb--visibly-hidden`);
        await this.wait(this.transitionDuration + this.padding);
        this._elementRef.nativeElement.classList.remove(`sb--visibly-hidden`);
      }
      if (wasVisible == undefined || this._visible == false) {
        this._elementRef.nativeElement.classList.add(`sb--hidden`);
        this.emitHideEnd();
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

    private emitShowStart(): void {
      this.onShowStart();
      this.showStart.emit();
    }

    private emitShowEnd(): void {
      this.onShowEnd();
      this.showEnd.emit();
    }

    private emitHideStart(): void {
      this.onHideStart();
      this.hideStart.emit();
    }

    private emitHideEnd(): void {
      this.onHideEnd();
      this.hideEnd.emit();
    }

    protected onShowStart(): void {};
    protected onShowEnd(): void {};
    protected onHideStart(): void {};
    protected onHideEnd(): void {};

    constructor(...args: Array<any>) {
      super(...args);

      this.visible = defaultVisiblity || false;
    }
  }
}
