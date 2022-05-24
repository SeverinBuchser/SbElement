
interface Quotes {
  left: string;
  right: string;
}

const QUOTES_ORDER: Array<Quotes> = [
    {left: '\"', right: '\"'},
    {left: '\'', right: '\''},
    {left: '\`', right: '\`'}
]

function validateQuotes(quotes?: Quotes): boolean {
  return doQuotesMatch(quotes?.left, quotes?.right);
}

function doQuotesMatch(left?: string, right?: string): boolean {
  return (left && right) ? true : false
    && isQuote(left!) && isQuote(right!) 
    && left == right
}

function isQuote(string: string): boolean {
  return /["']/.test(string);
}

function findNextQuotes(quotes?: Quotes): Quotes | undefined {
  const index = QUOTES_ORDER.findIndex((quotesToCheck: Quotes) => {
    return quotes 
      && quotes.left == quotesToCheck.left 
      && quotes.right == quotesToCheck.right;
  })

  if (index < 0) return;
  return QUOTES_ORDER[(index + 1) % QUOTES_ORDER.length];
}

export class QuoteGroup {
  private _matches: Array<RegExpMatchArray> = new Array();
  private _quoteGroups: Array<QuoteGroup> = new Array();
  private _replacedString: string;

  get replacedString(): string {
    return this._replacedString;
  }

  constructor(private _originalString: string, private _quotes?: Quotes) {
    this._validateQuotes(this._quotes);
    this._replacedString = this._originalString;
    this._build();
  }
  public reconstruct(reconstructionString: string, replaceQuotesWith?: Quotes): string {
    this._validateReconstruction(reconstructionString);
    this._validateQuotes(replaceQuotesWith);

    const nextQuotes = this._quotes ? findNextQuotes(replaceQuotesWith) : replaceQuotesWith;
    
    this._quoteGroups.forEach((group: QuoteGroup, index: number) => {
      const regExp = new RegExp(QuoteGroup.getPlaceholder(index), 'g');
      const match = reconstructionString.match(regExp)!;
      reconstructionString = reconstructionString.replace(
        match[0], 
        group.reconstruct(group.replacedString, nextQuotes)
      );
    })

    return this._addQuotes(reconstructionString, replaceQuotesWith);
  }

  private _build(): void {
    this._matchQuotes();
    this._findGroups();
  }

  private _matchQuotes(): void {
    const matches = this._replacedString.matchAll(/["']/g);
    this._matches = new Array();
    for (let match of matches) {
      this._matches.push(match);
    }
  }

  private _findGroups(): void {
    let startQuote: RegExpMatchArray;
    this._matches.some((currentQuote: RegExpMatchArray) => {
      if (startQuote) {
        if (startQuote[0] == currentQuote[0]) {
          this._buildNewGroup(startQuote, currentQuote);
          return true;
        }
      } else {
        startQuote = currentQuote;
      }
      return false;
    })
  }

  private _buildNewGroup(
    startQuote: RegExpMatchArray, 
    endQuote: RegExpMatchArray
  ) {
    const groupString = this._replacedString.substring(
      startQuote.index! + 1, 
      endQuote.index!
    );
    this._replacedString = this._replacedString.replace(
      startQuote[0] + groupString + endQuote[0], 
      QuoteGroup.getPlaceholder(this._quoteGroups.length)
    );
    this._quoteGroups.push(new QuoteGroup(groupString, {
      left: startQuote[0], 
      right: endQuote[0]
    }));
    this._build();
  }

  private _validateReconstruction(reconstructionString: string): void {
    const matches = reconstructionString.match(/<<<<<<<\d+>>>>>>>/g);

    if (!matches && this._quoteGroups.length > 0 
      || matches && matches.length != this._quoteGroups.length) {

      throw new Error("QuoteGroup: String cannot be reconstructed");
    }
  }

  private _validateQuotes(quotes?: Quotes): void {
    if (quotes && !validateQuotes(quotes)) {
      throw new Error("QuoteGroup: Quotes are invalid")
    }
  }

  private _addQuotes(string: string, replaceQuotesWith?: Quotes): string {
    if (this._quotes && !replaceQuotesWith) {
      string = this._quotes.left + string;
      string += this._quotes.right;
    } else if (this._quotes && replaceQuotesWith) {
      string = replaceQuotesWith.left + string;
      string += replaceQuotesWith.right;
    }
    return string;
  }

  public static isPlaceholder(string: string): boolean {
    return /^<<<<<<<\d+>>>>>>>$/g.test(string);
  }

  public static getPlaceholder(id: number): string {
    return `<<<<<<<${id}>>>>>>>`;
  }
}