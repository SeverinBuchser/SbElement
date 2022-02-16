import { AbstractConstructor, Constructor } from "./constructor";
import { HasElementRef } from "./has-element-ref";

export interface CanTabindex {
  tabindex: number | undefined;
  defaultTabindex?: number;
}

type CanTabindexCtor = Constructor<CanTabindex> & AbstractConstructor<CanTabindex>;

export function mixinTabindex<T extends AbstractConstructor<HasElementRef>>(
  core: T,
  defaultTabindex?: number
): CanTabindexCtor & T;
export function mixinTabindex<T extends Constructor<HasElementRef>>(
  core: T,
  defaultTabindex?: number
): CanTabindexCtor & T {
  return class extends core {
    private _tabindex: number | undefined;
    public defaultTabindex = defaultTabindex;

    get tabindex(): number | undefined {
      return this._tabindex;
    }
    set tabindex(value: number | undefined) {
      const tabindex = value || this.defaultTabindex;

      if (tabindex !== undefined && tabindex !== this._tabindex) {
        this._elementRef.nativeElement.tabIndex = tabindex;
      }

      this._tabindex = tabindex;
    }

    constructor(...args: Array<any>) {
      super(...args);

      this.tabindex = defaultTabindex;
    }
  }
}
