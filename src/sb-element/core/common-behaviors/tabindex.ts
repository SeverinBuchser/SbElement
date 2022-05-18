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
    private _tabindex: number = -1;
    public defaultTabindex = defaultTabindex;

    get tabindex(): number | undefined {
      return this._tabindex;
    }
    set tabindex(value: number | undefined) {
      let tabindex;
      if (value == undefined) {
        tabindex = this.defaultTabindex;
      } else {
        tabindex = value;
      }
      if (tabindex == undefined) {
        tabindex = -1;
      }

      if (tabindex !== this._tabindex) {
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
