import { Csv, Delimiter } from "../csv/csv";
import { ColumnInformation } from "./column-information";
import { ColumnInformationInterface, ColumnInformationOptionsInterface } from './column-information.interface';

/**
 * An abstract class holding information about a table. The table consists of
 * columns of different data types. Each column has different styling options
 * in the form of {@link ColumnInformationInterface}.
 */
export class Table {

  /**
   * Information about the columns.
   */
  public columnInformation: Array<ColumnInformationInterface>
    = new Array<ColumnInformationInterface>();

  /**
   * The data of the table. The data is stored as an array of data for each row.
   * The each row contains the data for each column.
   */
  public data: Array<Array<any>> = new Array<Array<any>>();

  constructor();
  constructor(
    data: Array<Array<any>>,
    columnInformation: Array<ColumnInformationInterface>
  );
  constructor(
    data?: Array<Array<any>>,
    columnInformation?: Array<ColumnInformationInterface>
  ) {
    if (data && columnInformation) {
      this.data = data;
      this.columnInformation = columnInformation;
    }
  }

  /**
   * Returns the column information by column index or name.
   *
   * @param{string | number} nameOrIndex The column index or the name of the
   * column
   * @returns{ColumnInformationInterface} The information about the column of
   * either the column with the specified index or name
   */
  public getColumnInformation(
    nameOrIndex: string | number
  ): ColumnInformationInterface {
    if (typeof nameOrIndex === 'number') {
      return this.columnInformation[nameOrIndex]
    } else {
      let info = this.columnInformation.find(columnInformation => {
        return columnInformation.name === nameOrIndex
      })
      if (info) return info;
      else throw new Error('Column Information with name' + nameOrIndex +
        'does not exist!')
    }
  }

  public static async fromCSV(csvFile: File): Promise<Table> {
    return Csv.parseFile(csvFile).then(csv => {
      let columnInformation = new Array<ColumnInformation>();
      csv.forEachColumnName(columnName => {
        columnInformation.push(ColumnInformation.defaults.set({name: columnName}))
      });
      
      return new Table(csv.data, columnInformation);
    });
  }

  public static fromRows(
    rows: Array<Array<any>>,
    columnInformation: Array<ColumnInformationOptionsInterface>
  ): Table {
    return new Table(rows, columnInformation.map(
      info => ColumnInformation.defaults.set(info)
    ));
  }

  public static fromJSON(table: Object): Table {
    let entries = Object.entries(table);
    let columns = new Array<Array<any>>();
    let columnInformation = new Array<ColumnInformationInterface>();

    entries.forEach(entry => {
      if (Array.isArray(entry[1])) {
        columns.push(entry[1])
        columnInformation.push(ColumnInformation.defaults.set({name: entry[0]}))
      }
    })

    return new Table(this.columnsToRows(columns), columnInformation);
  }

  private static getMaxColumnLength(columns: Array<Array<any>>): number {
    let max = 0;
    columns.forEach(column => max = column.length > max ? column.length : max);
    return max;
  }

  private static columnsToRows(columns: Array<Array<any>>): Array<Array<any>> {
    let rows = new Array<Array<any>>();
    for (let i = 0 ; i < this.getMaxColumnLength(columns) ; i++) {
      let row = new Array<any>();
      columns.forEach(column => {
        row.push(column[i] ? column[i] : '-')
      })
      rows.push(row);
    }
    return rows;
  }
}
