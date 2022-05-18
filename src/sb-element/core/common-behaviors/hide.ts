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
  transitionElement: ElementRef;
  defaultVisiblity?: boolean;
  wait(time: number): Promise<void>;
}

export const padding = 5;

type CanHideCtor = Constructor<CanHide> & AbstractConstructor<CanHide>;

export function mixinHide<T extends AbstractConstructor<HasElementRef>>(
  core: T,
  isVisibleInital?: boolean
): CanHideCtor & T;
export function mixinHide<T extends Constructor<HasElementRef>>(
  core: T,
  isVisibleInital: boolean = false
): CanHideCtor & T {
  return class extends core {
    private _visible: boolean | undefined;

    public showStart: EventEmitter<void> = new EventEmitter<void>();
    public showEnd: EventEmitter<void> = new EventEmitter<void>();
    public hideStart: EventEmitter<void> = new EventEmitter<void>();
    public hideEnd: EventEmitter<void> = new EventEmitter<void>();

    public transitionElement: ElementRef = this._elementRef;

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

    private addClass(className: string): void {
      this._elementRef.nativeElement.classList.add(className);
    }

    private removeClass(className: string): void {
      this._elementRef.nativeElement.classList.remove(className);
    }

    private async showElement(wasVisible: boolean | undefined): Promise<void> {
      this.removeClass('sb--hidden');
      if (wasVisible !== undefined) {
        await this.visiblyHiddenFor(padding);
      }
      this.emitShowStart();
      this.addClass('sb--visible');
      await this.wait(this.transitionDuration + padding);
      this.emitShowEnd();
    }

    private async hideElement(wasVisible: boolean | undefined): Promise<void> {
    this.removeClass('sb--visible');
      this.emitHideStart();
      if (wasVisible !== undefined) {
        await this.visiblyHiddenFor(this.transitionDuration + padding);
      }
      if (wasVisible == undefined || this._visible == false) {
        this.addClass('sb--hidden');
        this.emitHideEnd();
      }
    }

    private async visiblyHiddenFor(duration: number): Promise<void> {
      this.addClass('sb--visibly-hidden');
      await this.wait(duration);
      this.removeClass('sb--visibly-hidden');
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

      this.visible = isVisibleInital;
    }
  }
}
