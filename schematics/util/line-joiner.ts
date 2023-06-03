import { Generatable } from "./generatable";

export class LineJoiner<T extends Generatable = Generatable> implements Generatable {
  private _generatables: Array<T>;

  constructor(...generatables: Array<T>) {
    this._generatables = generatables;
  }
  
  public add(...generatables: Array<T>): void {
    this._generatables.push(...generatables)
  }

  public generate(): string {
    return this._generatables.map(generatable => generatable.generate()).join("\n");
  }
}