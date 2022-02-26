/**
 * A queue class with basic queue operations.
 *
 * The queue class handles dequeuing and enqueuing of elements, as well as
 * length management. The [dequeue]{@link #dequeue} method checks for an empty
 * queue, but does not produce an error if the queue is empty. Instead it
 * returns `undefinded`.
 */
export class Queue<T> {
  /**
   * The actual queue, which holds the elements.
   */
  private queue: Array<T> = new Array<T>();

  /**
   * Enqueues an element into the `Queue`.
   *
   * It appends an element to the [queue]{@link #queue} `Array`.
   *
   *  @param{T} value The element to add to the `Queue`
   */
  public enqueue(value: T): void {
    this.queue.push(value);
  }

  /**
   * Removes (dequeues) the next element in the `Queue`.
   *
   * The next element is the first element of the [queue]{@link #queue} `Array`.
   * The method therefore gets the first element of this `Array` and shifts the
   * `Array` by one to the left.
   *
   * If the `Queue` is empty (the [queue]{@link #queue} `Array` is empty), the
   * method will return `undefined` instead of throwing an error.
   *
   * @returns{T | undefined} The first element in the queue or `undefined` if the
   * `Queue` is empty
   */
  public dequeue(): T | undefined {
    if (!this.isEmpty()) {
      return this.queue.shift();
    } else return undefined;
  }

  /**
   * Gets the current length of the `Queue`.
   *
   * The method returns the length of the [queue]{@link #queue} `Array`.
   *
   * @returns{number} The length of the `Queue`
   */
  get length(): number {
    return this.queue.length;
  }

  /**
   * Checks if the `Queue` is empty or not.
   *
   * The `Queue` if the [queue]{@link #queue} `Array` is empty.
   *
   * @returns{boolean} `true` if the queue is empty or `false` otherwise
   */
  public isEmpty(): boolean {
    return this.queue.length == 0;
  }

}
