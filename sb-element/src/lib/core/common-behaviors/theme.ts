import { Subscription } from "rxjs";
import { AbstractConstructor, Constructor } from "./constructor";
import { HasElementRef } from "./has-element-ref";
import { HasSbThemeService } from "./has-theme-service";

export interface CanTheme {
  theme: string | undefined;
}

type CanThemeCtor = Constructor<CanTheme> & AbstractConstructor<CanTheme>;

export function mixinTheme<T extends AbstractConstructor<HasElementRef & HasSbThemeService>>(
  core: T
): CanThemeCtor & T;
export function mixinTheme<T extends Constructor<HasElementRef & HasSbThemeService>>(
  core: T
): CanThemeCtor & T {
  return class extends core {
    private _theme: string | undefined;
    private _subscription: Subscription;


    get theme(): string | undefined {
      return this._theme;
    }
    set theme(theme: string | undefined) {

      if (theme !== this._theme) {
        if (this._theme) {
          this._elementRef.nativeElement.classList.remove(`sb--${this._theme}`);
        }
        if (theme) {
          this._elementRef.nativeElement.classList.add(`sb--${theme}`);
        }

        this._theme = theme;
      }
    }

    constructor(...args: Array<any>) {
      super(...args);
      this._subscription = this._themeService.subscribe(this);
    }

    public next = (theme: string): void => {
      this.theme = theme;
    };

    public ngOnDestroy(): void {
      this._subscription.unsubscribe();
    }
  }
}
