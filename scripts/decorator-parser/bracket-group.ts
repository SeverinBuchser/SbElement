export class BracketGroup {
  public left?: number;
  public right?: number;
  public parent?: BracketGroup;
  public children: Array<BracketGroup> = new Array();
  public between: string = '';
  public before: string = '';
  public bracket: string = '';

  public previousIndex(): number {
    if (this.parent) {
      const index = this.parent.children.indexOf(this);
      if (index > 0) {
        return this.parent.children[index - 1].right!;
      } else {
        return this.parent.left!;
      }
    }
    return 0;
  }

  public traverse(
    beforeCallback: (bracketGroup: BracketGroup) => void,
    afterCallback: (bracketGroup: BracketGroup) => void
  ): void {
    beforeCallback(this);
    this.children.forEach((bracketGroup: BracketGroup) => {
      bracketGroup.traverse(beforeCallback, afterCallback);
    })
    afterCallback(this);
  }

  public static read(bracketString: string): BracketGroup | undefined {
    const bracketStack: Array<string> = new Array();
    const quoteStack: Array<string> = new Array();
    let bracketGroup: BracketGroup = new BracketGroup();

    for (let index = 0 ; index <= bracketString.length ; index++) {
      let char = bracketString.charAt(index);

      if (quoteStack[quoteStack.length - 1] == char) {
        quoteStack.pop();
      } else if (char == '"' || char == "'") {
        quoteStack.push(char);
      }

      if (quoteStack.length == 0) {
        if (isLeftBracket(char) || isRightBracket(char)) {
          if (isLeftBracket(char)) {
            bracketStack.push(char);
            let oldBracketGroup = bracketGroup;
            bracketGroup = new BracketGroup();
            bracketGroup.bracket = char;
            bracketGroup.left = index;
            bracketGroup.parent = oldBracketGroup;
            oldBracketGroup.children.push(bracketGroup);
            
          } else if (
            isRightBracket(char) 
            && matcheLeftBracket(bracketStack[bracketStack.length - 1], char)
          ) {
            bracketStack.pop();
            bracketGroup.right = index;
            bracketGroup.between = bracketString.substring(
              bracketGroup.left! + 1, 
              index
            );
            bracketGroup.before = bracketString.substring(
              bracketGroup.previousIndex() + 1, 
              bracketGroup.left!
            );
            if (bracketGroup.parent) {
              bracketGroup = bracketGroup.parent;
            }
          } else {
            throw new Error("Brackets does not match");
          }
        }
      }      
    }
    return bracketGroup.children[0] ? bracketGroup.children[0] : undefined;
  }
}

function isLeftBracket(char: string): boolean {
  return /[\(\[\{]/g.test(char);
}
function isRightBracket(char: string): boolean {
  return /[\)\]\}]/g.test(char);
}
function matcheLeftBracket(leftChar: string, char: string): boolean {
  return char == ']' && leftChar == '[' 
    || char == ')' && leftChar == '(' 
    || char == '}' && leftChar == '{';
}