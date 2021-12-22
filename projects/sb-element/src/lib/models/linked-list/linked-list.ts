import { ListItem, NullListItem } from "./list-item";

export class LinkedList<T> implements Iterable<T>, Iterator<T> {
  private _start: ListItem<T> = new NullListItem();
  get start(): ListItem<T> {return this._start};
  private _end: ListItem<T> = new NullListItem();
  get end(): ListItem<T> {return this._end};
  private current: ListItem<T> = new NullListItem();
  private currentIndex: number = 0;
  private _length: number = 0;
  get length(): number {return this._length};

  constructor(values?: Array<T>);
  constructor(value?: T);
  constructor(valueOrValues?: T | Array<T>) {
    if (valueOrValues) {
      if (Array.isArray(valueOrValues)) {
        this.add(valueOrValues);
      } else {
        this.add(valueOrValues);
      }
    }
  }

  public add(values: Array<T>): void;
  public add(value: T): void;
  public add(valueOrValues: T | Array<T>): void {
    if (Array.isArray(valueOrValues)) {
      valueOrValues.forEach((value: T) => this.addValue(value))
    } else {
      this.addValue(valueOrValues);
    }
  }

  private addValue(value: T): void {
    if (!this._length) {
      this.addFirst(value);
    } else {
      this._end = this._end.add(value);
    }
    this._length++;
  }

  private addFirst(value: T): void {
    this._start = new ListItem(value);
    this._end = this._start;
    this.current = this._start;
  }

  public getItem(index: number): ListItem<T> {
    if (index < 0 || index >= this._length) {
      throw new RangeError(`Index ${index} is out of bounds!`);
    }
    let current = this._start;
    for (let i = 0 ; i < index ; i++) {
      if (current.next) {
        current = current.next
      }
    }
    return current;
  }

  public get(index: number): T {
    return this.getItem(index).value;
  }

  public indexOf<TypeToFind>(finder: (value: T) => boolean): number {
    let index = 0;
    for (let value of this) {
      if (finder(value)) {
        return index;
      };
      index++;
    }
    return -1;
  }

  public find<TypeToFind>(finder: (value: T) => boolean): T | undefined {
    for (let value of this) {
      if (finder(value)) {
        return value;
      };
    }
    return undefined;
  }

  [Symbol.iterator](): Iterator<T> {
    return this;
  }

  next(value?: any): IteratorResult<T> {
    let result: IteratorResult<T> = {
      done: false,
      value: this.current.value
    };

    if (this.currentIndex < this.length - 1 && this.current.next) {
      this.current = this.current.next;
      this.currentIndex++;
    } else if (this.current == this._end){
      this.current = this._start;
    } else {
      this.currentIndex = 0;
      return {done: true, value: undefined};
    }

    return result;
  }

}
