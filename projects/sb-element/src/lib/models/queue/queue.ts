export class Queue<T> {

  private queue: Array<T> = new Array<T>();

  public enqueue(value: T) {
    this.queue.push(value);
  }

  public dequeue(): T | undefined {
    if (!this.isEmpty()) {
      return this.queue.shift();
    } else return undefined;
  }

  get length(): number {
    return this.queue.length;
  }

  public isEmpty(): boolean {
    return this.queue.length == 0;
  }

}
