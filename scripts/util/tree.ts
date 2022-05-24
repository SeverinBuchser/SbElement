export class Tree<T> {
  public root: Node<T>;

  constructor(root: T) {
    this.root = new Node(root);
  }

  public traverse(callback: (data: T, node: Node<T>) => void): void {
    this._traverseFrom(this.root, callback);
  }

  private _traverseFrom(node: Node<T>, callback: (data: T, node: Node<T>) => void): void {
    node.forEachChild((data: T, node: Node<T>) => {
      callback(data, node);
      this._traverseFrom(node, callback);
    })
  }
}

export class Node<T> {
  private static GLOBAL_ID: number = 0;
  private _id: number = Node.GLOBAL_ID++;

  public parent?: Node<T>;
  public children: Array<Node<T>> = new Array();

  get hasParent(): boolean {
    return this.parent ? true : false;
  }

  constructor(public data: T, parent?: Node<T>) {
    if (parent) {
      this.parent = parent;
      if (!parent._hasDirectChild(this)) {
        parent._addChildNode(this);
      }
    }
  }

  private _hasDirectChild(child: Node<T>): boolean {
    return this.children.includes(child);
  }

  public addChild(child: T): Node<T> {
    return new Node(child, this);
  }

  private _addChildNode(child: Node<T>): void {
    this.children.push(child);
  }

  public forEachChild(callback: (data: T, node: Node<T>) => void): void {
    this.children.forEach((child: Node<T>) => {
      callback(child.data, child);
    })
  }
}