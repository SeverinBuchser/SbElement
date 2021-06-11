export enum Delimiter {
  COMMA = ',',
  COLON = ':',
  SEMICOLON = ';'
}

export class Csv {

  private static START_DELIMITER: RegExp = /(?:'|"|)(?:\s*)/;
  private static END_DELIMITER: RegExp = /(?:\s*)(?:'|"|)/;
  private static DELIMITER: RegExp = /(?:'|"|)(?:\s*)(?:,|;|$)(?:\s*)(?:'|"|)/;

  constructor(
    public header: Array<string>,
    public data: Array<Array<string>>
  ) {}

  public forEachColumnName(
    fn: (columnName: string, index: number) => void
  ): void {
    this.header.forEach((columnName: string, index: number) => {
      fn(columnName, index);
    });
  }

  public forEachColumn(
    fn: (columnName: string, columnData: Array<string>, index: number) => void
  ): void {
    this.header.forEach((columnName: string, index: number) => {
      fn(columnName, this.getColumnData(index), index);
    });
  }

  public getColumnData(index: number): Array<string> {
    return this.data.map(row => row[index]);
  }

  /**
   * Static Members
   */

  public static async parseFile(
    file: File,
    delimiter?: Delimiter
  ): Promise<Csv> {
    if (file.type != 'text/csv') {
      return Promise.reject("File is not a CSV file!");
    }
    let content = await file.text();
    return this.parseString(content, delimiter);
  }

  public static parseString(string: string, delimiter?: Delimiter): Csv {
    let rows = this.rows(string);
    let splitRows = new Array<Array<string>>();
    rows.forEach(row => splitRows.push(this.split(row, delimiter)));
    return new Csv(
      splitRows[0],
      splitRows.slice(1)
    )
  }

  private static rows(string: string): Array<string> {
    let rows = string.split('\n');
    if (rows[rows.length - 1] === "") rows.splice(rows.length - 1, rows.length);
    return rows;
  }

  private static split(row: string, delimiter?: Delimiter): Array<string> {
    let split = row.split(this.useDelimiter(delimiter));

    let firstElement = split[0];
    if (firstElement && /^('|").*$/.test(firstElement)) {
      split[0] = firstElement.slice(1, firstElement.length);
    }

    let lastElement = split[split.length-1];
    if (lastElement && /^.*('|")$/.test(lastElement)) {
      split[split.length-1] = lastElement.substring(0, lastElement.length - 1);
    }
    return split;
  }

  private static useDelimiter(delimiter?: Delimiter): RegExp {
    if (delimiter) {
      return new RegExp(
        this.START_DELIMITER.source +
        '(?:' + delimiter + ')' +
        this.END_DELIMITER.source
      );
    } else return this.DELIMITER;
  }
}
