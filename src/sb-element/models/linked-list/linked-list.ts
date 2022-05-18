import { ListItem, NullListItem } from "./list-item";

export class LinkedList<T> implements Iterable<T> {
  private _start: ListItem<T> = new NullListItem();
  get start(): ListItem<T> {return this._start;};
  get first(): ListItem<T> {
    if (this._start.next) {return this._start.next;}
    return new NullListItem();
  };
  private _end: ListItem<T> = new NullListItem();
  get end(): ListItem<T> {return this._end;};
  get last(): ListItem<T> {
    if (this._end.previous) {return this._end.previous;}
    return new NullListItem();
  };

  protected _length: number = 0;
  get length(): number {return this._length};

  constructor(values?: Array<T>);
  constructor(value?: T);
  constructor(valueOrValues?: T | Array<T>) {
    this._start.insertNext(this._end);
    if (valueOrValues) {
      if (Array.isArray(valueOrValues)) {
        this.append(valueOrValues);
      } else {
        this.append(valueOrValues);
      }
    }
  }

  public append(values: Array<T>): void;
  public append(value: T): void;
  public append(valueOrValues: T | Array<T>): void {
    if (Array.isArray(valueOrValues)) {
      valueOrValues.forEach((value: T) => this.appendValue(value))
    } else {
      this.appendValue(valueOrValues);
    }
  }

  private appendValue(value: T): void {
    this._end.insertPrevious(value);
    this._length++;
  }

  public remove(index: number): void {
    let item = this.getItem(index);
    let next = item.next;
    let previous = item.previous;

    if (next) next.previous = previous;
    if (previous) previous.next = next;
    this._length--;
  }

  public getItem(index: number): ListItem<T> {
    if (index < 0 || index >= this._length) {
      throw new RangeError(`Index ${index} is out of bounds!`);
    }
    let current = this._start;
    for (let i = 0 ; i < index + 1 ; i++) {
      if (current.next) {current = current.next;}
    }
    return current;
  }

  public getValue(index: number): T {
    return this.getItem(index).value;
  }

  public indexOf(finder: (value: T) => boolean): number {
    let index = 0;
    for (let value of this) {
      if (finder(value)) {
        return index;
      };
      index++;
    }
    return -1;
  }

  public find(finder: (value: T) => boolean): T | undefined {
    for (let value of this) {
      if (finder(value)) {
        return value;
      };
    }
    return undefined;
  }

  public isStart(item: ListItem<T>): boolean {
    return this._start == item;
  }

  public isEnd(item: ListItem<T>): boolean {
    return this._end == item;
  }

  public swap(leftIndex: number, rightIndex: number) {
    if (leftIndex > rightIndex) {
      let leftIndexTmp = leftIndex;
      leftIndex = rightIndex;
      rightIndex = leftIndexTmp;
    }
    if (leftIndex == rightIndex) return;
    if (leftIndex + 1 != rightIndex) {
      const left = this.getItem(leftIndex);
      const right = this.getItem(rightIndex);

      const leftPrev = left.previous;
      const leftNext = left.next;
      const rightPrev = right.previous;
      const rightNext = right.next;

      if (leftPrev) {
        leftPrev.next = right;
      }

      if (leftNext) {
        leftNext.previous = right;
      }

      if (rightPrev) {
        rightPrev.next = left;
      }

      if (rightNext) {
        rightNext.previous = left;
      }

      right.previous = leftPrev;
      left.next = rightNext;
      left.previous = rightPrev;
      right.next = leftNext;

    } else this.swapWithNext(leftIndex);
  }

  public swapWithPrevious(index: number) {
    if (index >= 1) {
      const item = this.getItem(index);

      if (item.previous) {
        const next = item.next;
        const prev = item.previous;
        const prevPrev = item.previous.previous;

        if (prevPrev) {
          prevPrev.next = item;
        }
        if (next) {
          next.previous = prev;
        }
        prev.next = next;
        prev.previous = item;
        item.next = prev;
        item.previous = prevPrev;
      }
    }
  }

  public swapWithNext(index: number) {
    if (index + 1 < this._length) {
      const item = this.getItem(index);

      if (item.next) {
        const prev = item.previous;
        const next = item.next;
        const nextNext = item.next.next;

        if (nextNext) {
          nextNext.previous = item;
        }
        if (prev) {
          prev.next = next;
        }
        next.previous = prev;
        next.next = item;
        item.previous = next;
        item.next = nextNext;
      }
    }
  }

  [Symbol.iterator](): Iterator<T> {
    return new LinkedListIterator(this);
  }

}

class LinkedListIterator<T> implements Iterator<T> {
  private current: ListItem<T>;

  constructor(private linkedList: LinkedList<T>) {
    this.current = linkedList.start;
  }

  next(): IteratorResult<T> {
    if (this.current.next) {this.current = this.current.next;}

    let result: IteratorResult<T> = {
      done: false,
      value: this.current.value
    };

    if (this.current == this.linkedList.end) {
      this.current = this.linkedList.start;
      return {done: true, value: undefined};
    }

    return result;
  }
}
