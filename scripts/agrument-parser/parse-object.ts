import { BracketGroup } from "./bracket-group";
import { QuoteGroup } from "./quote-group";

export function parseObjectString(objectString: string): any {
  if (!/[\[\]\{\}\(\)]/g.test(objectString)) return objectString;
  objectString = objectString.replaceAll(/\s/g, '').replaceAll(/,([\]\)\}])/g, '$1');

  const quoteGroup = new QuoteGroup(objectString);
  objectString = quoteGroup.replacedString;

  const bracketGroup = new BracketGroup(objectString);
  objectString = bracketGroup.reconstruct(addQuotes);
  
  objectString = quoteGroup.reconstruct(objectString, {left: "'", right: "'"})
  return JSON.parse(objectString);
}

function addQuotes(string: string): string {
  string = string.split(',').map(split => {
    return split.split(':').map(split => {
      if (split != '' && !BracketGroup.isPlaceholder(split)) {
        return `"${split}"`;
      }
      return split;
    }).join(':');
  }).join(',');

  return string;
}

function getRightBracket(bracket: string): string {
  if (bracket == '[') return ']';
  if (bracket == '(') return ')';
  if (bracket == '{') return '}';
  return '';
}