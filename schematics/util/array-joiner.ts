import { Generatable } from "./generatable";

export class ArrayJoiner<T extends Generatable = Generatable> implements Generatable {

  constructor(
    private _tabCount: number, 
    private _generatables: Array<T> = new Array(),
    private _indentFirstBracket: boolean = true
  ) {}
  
  public add(...generatables: Array<T>): void {
    this._generatables.push(...generatables)
  }

  public generate(): string {
    return '\t'.repeat(this._indentFirstBracket ? this._tabCount : 0) 
      + '[\n' + this._generatables.map(entry => {
        return entry.generate()
          .split('\n')
          .map(line => '\t'.repeat(this._tabCount + 1) +  line)
          .join('\n')
      }).join(",\n") 
      + '\n' + '\t'.repeat(this._tabCount) + ']';
  }
}