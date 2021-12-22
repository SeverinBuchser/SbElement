export class ListItem<T> {
  public next?: ListItem<T>;
  public previous?: ListItem<T>;

  constructor(public value: T) {}

  public add(value: T): ListItem<T> {
    let item = new ListItem<T>(value);
    item.previous = this;
    this.next = item;
    return item;
  }
}

export class NullListItem<T> extends ListItem<any> {
  constructor() {
    super(null);
  }
}
