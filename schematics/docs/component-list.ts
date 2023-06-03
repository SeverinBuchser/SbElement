import { Generatable } from "../util";

export class ComponentList implements Generatable {

  constructor(
    private _tabCount: number, 
    private _names: Array<string> = new Array(), 
    private _indentFirst: boolean = true
  ) {}

  public add(name: string): void {
    this._names.push(name);
  }

  public generate(): string {
    return this._names.map((name: string, index: number) => {
      const doIndent = this._indentFirst && index == 0 || index != 0;
      return '\t'.repeat(doIndent ? this._tabCount : 0) +  name;
    }).join(',\n');
  }

  public generateAppend(append: string): string {
    return this.generate() + append;
  }
}
