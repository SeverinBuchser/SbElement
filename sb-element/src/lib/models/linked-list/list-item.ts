export class ListItem<T> {
  public next?: ListItem<T>;
  public previous?: ListItem<T>;

  constructor(public value: T) {}

  public insertNext(next: ListItem<T>): ListItem<T>;
  public insertNext(value: T): ListItem<T>;
  public insertNext(nextOrValue: ListItem<T> | T): ListItem<T> {
    let item = ListItem.toItem(nextOrValue);
    item.previous = this;
    if (this.next) {
      item.next = this.next;
      this.next.previous = item;
    }
    this.next = item;
    return item;
  }

  public insertPrevious(previous: ListItem<T>): ListItem<T>;
  public insertPrevious(value: T): ListItem<T>;
  public insertPrevious(previousOrValue: ListItem<T> | T): ListItem<T> {
    let item = ListItem.toItem(previousOrValue);
    item.next = this;
    if (this.previous) {
      item.previous = this.previous;
      this.previous.next = item;
    }
    this.previous = item;
    return item;
  }

  private static toItem<T>(itemOrValue: ListItem<T> | T): ListItem<T> {
    let item: ListItem<T>;
    if (itemOrValue instanceof ListItem) {
      item = itemOrValue;
    } else {
      item = new ListItem<T>(itemOrValue);
    }
    return item;
  }
}

export class NullListItem extends ListItem<any> {
  constructor() {
    super(null);
  }
}
