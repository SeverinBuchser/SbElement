export enum Side {
  TOP = 'top',
  LEFT = 'left',
  RIGHT = 'right',
  BOTTOM = 'bottom'
}

export class Position {
  private static minAlignment = -1;
  private static maxAlignment = 1;

  get sideAlignment(): number {
    return this.alignment * (this.isNegativeAlignment ? -1 : 1);
  }

  get isTop(): boolean {
    return Side.TOP == this.side;
  }

  get isLeft(): boolean {
    return Side.LEFT == this.side;
  }

  get isRight(): boolean {
    return Side.RIGHT == this.side;
  }

  get isBottom(): boolean {
    return Side.BOTTOM == this.side;
  }

  get isNegativeSide(): boolean {
    return this.isTop || this.isLeft;
  }

  get isNegativeAlignment(): boolean {
    return this.isLeft || this.isRight
  }

  constructor(public side: Side, public alignment: number) {}

  public oppositeSide(): Position {
    let oppositeSide: Side = Side.LEFT;

    if (this.isTop) {
      oppositeSide = Side.BOTTOM;
    } else if (this.isBottom) {
      oppositeSide = Side.TOP;
    } else if (this.isLeft) {
      oppositeSide = Side.RIGHT
    }

    return new Position(oppositeSide, this.alignment);
  }

  public oppositeAlignment(): Position {
    return new Position(this.side, - this.alignment);
  }

  public toString = () => {
    return this.side + '-' + this.alignment;
  }

  public static parse(stringPosition: string): Position {
    let split = stringPosition.split('-');
    let side: Side = split[0] as Side;

    let alignment = parseFloat(split[1]);

    if (isNaN(alignment)) {
      if ('start' == split[1]) {
        alignment = -1;
      } else if ('center' == split[1] || split[1] == undefined) {
        alignment = 0;
      } else if ('end' == split[1]) {
        alignment = 1;
      } else {
        throw new Error(`Could not parse alignment ${split[1]}!`);
      }
    }

    return new Position(side, alignment);
  }
}
