interface Brackets {
  left: string;
  right: string;
}

function validateBrackets(brackets?: Brackets): boolean {
  return doBracketsMatch(brackets?.left, brackets?.right);
}

function doBracketsMatch(left?: string, right?: string): boolean {
  return (left && right) ? true : false
    && isLeftBracket(left!) && isRightBracket(right!) 
    && isBracketPair(left!, right!)
}

function isLeftBracket(bracket: string): boolean {
  return /[\(\[\{]/g.test(bracket);
}

function isRightBracket(bracket: string): boolean {
  return /[\)\]\}]/g.test(bracket);
}

function isBracketPair(left: string, right: string): boolean {
  return left == '[' && right == ']' 
    || left == '(' && right == ')' 
    || left == '{' && right == '}';
}


export class BracketGroup {
  private _matches: Array<RegExpMatchArray> = new Array();
  private _bracketGroups: Array<BracketGroup> = new Array();
  private _replacedString: string;

  get replacedString(): string {
    return this._replacedString;
  }
  public left: number;
  public right: number;
  public parent?: BracketGroup;
  public children: Array<BracketGroup> = new Array();
  public between: string = '';
  public before: string = '';
  public after: string = '';
  public bracket: string = '';

  constructor(private _originalString: string, private _brackets?: Brackets) {
    this._validateBrackets(this._brackets);
    this._replacedString = this._originalString;
    this._build();
    this.left = 0;
    this.right = this._originalString.length;
  }

  public reconstruct(callback: (replacedString: string) => string): string {
    let reconstructionString = callback(this.replacedString);
    this._validateReconstruction(reconstructionString);
    
    this._bracketGroups.forEach((group: BracketGroup, index: number) => {
      const regExp = new RegExp(BracketGroup.getPlaceholder(index), 'g');
      const match = reconstructionString.match(regExp)!;
      reconstructionString = reconstructionString.replace(
        match[0], 
        group.reconstruct(callback)
      );
    })

    return this._addBrackets(reconstructionString);
  }

  private _build(): void {
    this._matchBrackets();
    this._findGroups();
  }

  private _matchBrackets(): void {
    const matches = this._replacedString.matchAll(/[\[\]\{\}\(\)]/g);
    this._matches = new Array();
    for (let match of matches) {
      this._matches.push(match);
    }
  }

  private _findGroups(): void {
    let stack: Array<RegExpMatchArray> = new Array();
    this._matches.some((currentBracket: RegExpMatchArray) => {     
      const lastBracket = this._getLastBracket(stack)
      if (stack.length > 0 && isBracketPair(lastBracket![0], currentBracket[0])) {
        stack.pop();
        if (stack.length == 0) {
          this._buildNewGroup(lastBracket!, currentBracket);
          return true;
        }
      } else {
        stack.push(currentBracket)
      }
      return false;
    })
  }

  private _getLastBracket(stack: Array<RegExpMatchArray>): RegExpMatchArray | undefined {
    return stack[stack.length - 1];
  } 

  private _validateBrackets(brackets?: Brackets): void {
    if (brackets && !validateBrackets(brackets)) {
      throw new Error("BracketGroup: Brackets are invalid")
    }
  }

  private _buildNewGroup(
    startBracket: RegExpMatchArray, 
    endBracket: RegExpMatchArray
  ) {
    const groupString = this._replacedString.substring(
      startBracket.index! + 1, 
      endBracket.index!
    );
    this._replacedString = this._replacedString.replace(
      startBracket[0] + groupString + endBracket[0], 
      BracketGroup.getPlaceholder(this._bracketGroups.length)
    );
    this._bracketGroups.push(new BracketGroup(groupString, {
      left: startBracket[0], 
      right: endBracket[0]
    }));
    this._build();
  }

  private _validateReconstruction(reconstructionString: string): void {
    const matches = reconstructionString.match(/<======\d+======>/g);

    if (!matches && this._bracketGroups.length > 0 
      || matches && matches.length != this._bracketGroups.length) {

      throw new Error("BracketGroup: String cannot be reconstructed");
    }
  }

  private _addBrackets(string: string): string {
    if (this._brackets) {
      string = this._brackets.left + string;
      string += this._brackets.right;
    }
    return string;
  }

  public static isPlaceholder(string: string): boolean {
    return /^<======\d+======>$/g.test(string);
  }

  public static getPlaceholder(id: number): string {
    return `<======${id}======>`;
  }

}

