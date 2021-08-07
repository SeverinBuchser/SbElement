/**
 * Enumerator for allowed delimiters.
 */
export enum Delimiter {
  COMMA = ',',
  COLON = ':',
  SEMICOLON = ';'
}

/**
 * CSV can be parsed with this class. There are two methods for parsing CSV.
 * Either a File or a string can be parsed into iterable data. The data is
 * then eiher available as a whole or acessible over each column or column-name.
 * The data as a whole is acessible via the [data]{@link #data} field. This
 * field holds the rows of the table/csv.
 */
export class Csv {

  /**
   * Regex for the start delimiter. Used to regognize the start of the csv
   * string.
   */
  private static START_DELIMITER: RegExp = /(?:'|"|)(?:\s*)/;

  /**
   * Regex for the start delimiter. Used to regognize the end of the csv string.
   */
  private static END_DELIMITER: RegExp = /(?:\s*)(?:'|"|)/;

  /**
   * Regex for the delimiter inbetween columns.
   */
  private static DELIMITER: RegExp = /(?:'|"|)(?:\s*)(?:,|;|$)(?:\s*)(?:'|"|)/;

  /**
   * Instantiates a new {@link Csv} object. The object has header data as well
   * as the actual data.
   *
   * @param{Array<string>} header The header data
   * @param{Array<Array<string>>} data The data of the csv
   */
  constructor(
    public header: Array<string>,
    public data: Array<Array<string>>
  ) {}

  /**
   * Allows iterating over each columnname of the csv. The parameter function
   * takes a `columnName` and the `index` of the column.
   *
   * @param{(columnName: string, index: number) => void} fn The function to
   * execute when iterating
   */
  public forEachColumnName(
    fn: (columnName: string, index: number) => void
  ): void {
    this.header.forEach((columnName: string, index: number) => {
      fn(columnName, index);
    });
  }

  /**
   * Allows iterating over each column of the csv. The parameter function
   * takes a `columnName`, the `columnData` and the `index` of the column.
   *
   * @param{(columnName: string, columnData: Array<string>, index: number) => void} fn
   * The function to execute when iterating
   */
  public forEachColumn(
    fn: (columnName: string, columnData: Array<string>, index: number) => void
  ): void {
    this.header.forEach((columnName: string, index: number) => {
      fn(columnName, this.getColumnData(index), index);
    });
  }

  /**
   * Returns the columndata of the column with the corresponding index.
   *
   * @param{number} index The index of the column
   */
  public getColumnData(index: number): Array<string> {
    return this.data.map(row => row[index]);
  }

  /**
   * Parses a `File` into a {@link Csv} object. The parser takes the `File` and
   * extracts the headers and the data of the csv file. If the file is not of
   * type csv, the method will reject the promise and otherwise will parse the
   * file. If the delimiter is not provided, the method tries to figure the
   * delimiter out on its own. The delimiters can either be: ',', ':' or ';'.
   *
   * The method takes the content out of the file and passes it on to the string
   * parser.
   *
   * @param{File} file The csv file blob to parse
   * @param{Delimiter} delimiter The delimiter of the data
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

  /**
   * The method parses a string in form of a csv into a {@link Csv} object. The
   * method takes the csv string and an optional delimiter as parameter. If the
   * delimiter is not provided, the method tries to figure the delimiter out on
   * its own. The delimiters can either be: ',', ':' or ';'.
   *
   * After the extraction of the rows, which takes place in the beginning, the
   * rows will be split and the new {@link Csv} object will be created.
   *
   * @param{string} string The csv string to parse
   * @param{Delimiter} delimiter The delimiter of the data
   */
  public static parseString(string: string, delimiter?: Delimiter): Csv {
    let rows = this.rows(string);
    let splitRows = new Array<Array<string>>();
    rows.forEach(row => splitRows.push(this.split(row, delimiter)));
    return new Csv(
      splitRows[0],
      splitRows.slice(1)
    )
  }

  /**
   * Extracts the rows from the csv string. The rows are separated by a newline
   * character.
   *
   * @param{string} string The csv string to parse
   */
  private static rows(string: string): Array<string> {
    let rows = string.split('\n');
    if (rows[rows.length - 1] === "") rows.splice(rows.length - 1, rows.length);
    return rows;
  }

  /**
   * Splits up a row, in form of a string, into data. If the delimiter is
   * provided, the provided delimiter is used.
   *
   * The row will first be split with the determied delimiter. After that, the
   * first and last element of the row will be parsed seperately, since these
   * are special cases of data. The data will then be returned.
   *
   * @param{string} row The row to split up
   * @param{Delimiter} delimiter The delimiter of the data
   */
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

  /**
   * Determies which delimiter to use when the delimiter is not provied.
   *
   * @param{Delimiter} delimiter The delimiter of the data
   */
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
