import { BracketGroup } from "./bracket-group";

export function parseObjectString(objectString: string): any {
  objectString = objectString.replaceAll(/\s/g, '').replaceAll(/,([\]\)\}])/g, '$1');
  let string = '';
  const bracketGroup = BracketGroup.read(objectString);
  if (bracketGroup) {
    bracketGroup.traverse((bracketGroup: BracketGroup) => {
      string += addQuotes(bracketGroup.before);
      string += bracketGroup.bracket;
      string += bracketGroup.children.length == 0 ? addQuotes(bracketGroup.between) : '';
    }, (bracketGroup: BracketGroup) => {
      string += getRightBracket(bracketGroup.bracket);
    })

  }
  return JSON.parse(string);
}

function addQuotes(string: string): string {
  const quoteMatches = string.match(/'.*?'/g);
  if (quoteMatches) {
    quoteMatches.forEach((match: string, index: number) => {
      string = string.replace(match, `###${index}###`)
    })
  }

  string = string.split(',').map(split => {
    return split.split(':').map(split => {
      if (!split.includes("'") && split != '') {
        return `"${split}"`;
      } else if (/'(.*)'/g.test(split)) {
        return split.replaceAll("'", '"');
      } else if (/'/g.test(split)) {
        return split.replace("'", '"');
      } 
      return split;
    }).join(':');
  }).join(',');

  if (quoteMatches) {
    quoteMatches.forEach((match: string, index: number) => {
      match = match.replaceAll('"', '\\"');
      string = string.replace(
        `"###${index}###"`, 
        `"${match.substring(1, match.length-1)}"`
      )
    })
  }

  return string;
}

function getRightBracket(bracket: string): string {
  if (bracket == '[') return ']';
  if (bracket == '(') return ')';
  if (bracket == '{') return '}';
  return '';
}