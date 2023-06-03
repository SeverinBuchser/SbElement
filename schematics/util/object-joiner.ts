import { Generatable } from "./generatable";

export class ObjectJoiner<T extends ObjectKeyValueGenerator = ObjectKeyValueGenerator> 
  implements Generatable {

  constructor(
    private _tabCount: number, 
    private _entries: Array<T> = new Array(),
    private _indentFirstBracket: boolean = true
  ) {}
  
  public add(...entries: Array<T>): void {
    this._entries.push(...entries)
  }

  public generate(): string {
    return '\t'.repeat(this._indentFirstBracket ? this._tabCount : 0) 
      + '{\n' + this._entries.map(entry => {
        return entry.generate()
          .split('\n')
          .map(line => '\t'.repeat(this._tabCount + 1) +  line)
          .join('\n')
      }).join(",\n") 
      + '\n' + '\t'.repeat(this._tabCount) + '}';
  }
}

export class ObjectKeyValueGenerator implements Generatable {
  constructor(private _key: string, private _value: Generatable) {}

  public generate(): string {
    return `${this._key}: ${this._value.generate()}`;
  }
}