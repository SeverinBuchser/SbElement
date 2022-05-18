import { AbstractConstructor, Constructor } from "./constructor";
import { HasElementRef } from "./has-element-ref";

export interface CanClassName {
  readonly className: string | undefined;
}

type CanClassNameCtor = Constructor<CanClassName> & AbstractConstructor<CanClassName>;

export function mixinClassName<T extends AbstractConstructor<HasElementRef>>(
  core: T,
  className: string
): CanClassNameCtor & T;
export function mixinClassName<T extends Constructor<HasElementRef>>(
  core: T,
  className: string
): CanClassNameCtor & T {
  if (className == '') {
    throw new Error(`The className '${className}' is invalid!`);
  }
  return class extends core {
    private _className: string = className;

    get className(): string | undefined {
      return this._className;
    }

    constructor(...args: Array<any>) {
      super(...args);
      this._elementRef.nativeElement.classList.add(className);
    }
  }
}
