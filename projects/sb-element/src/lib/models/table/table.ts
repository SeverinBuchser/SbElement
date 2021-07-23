import { Csv } from "../csv/csv";
import { ColumnInformation } from "./column-information";
import { TableInterface } from "./table.interface";
import { ColumnInformationInterface, ColumnInformationOptionsInterface } from './column-information.interface';

/**
 * Datastructure, holding information about a table. The table consists of
 * columns of different data types. Each column has different styling options
 * in the form of {@link ColumnInformationInterface}. The data can be accessed
 * via tha [data]{@link #data} field. The styling options are stored in the
 * [columnInformation]{@link #columnInformation} array.
 */
export class Table implements TableInterface {

  /**
   * Information about the columns.
   */
  public columnInformation: Array<ColumnInformationInterface>
    = new Array<ColumnInformationInterface>();

  /**
   * The data of the table. The data is stored as an array of data for each row.
   * Each row contains the data for each column.
   */
  public data: Array<Array<any>> = new Array<Array<any>>();


  constructor();
  constructor(
    data: Array<Array<any>>,
    columnInformation: Array<ColumnInformationInterface>
  );
  /**
	 * Initiates a new {@link Table}. The table can be initiated with or without
   * data and style. If one or the other is missing, the initiation will create
   * an empty {@link Table}.
   *
   * @param{Array<Array<any>>} data The data of the `Table` stored as an
   * `Array` of columns
   * @param{Array<ColumnInformation>} columnInformation The styling information
   * for each column
	 */
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
   * Creates a {@link Table} from a `CSV` file.
   *
   * The Function returns a promise, since the {@link Csv} class has to access
   * the filesystem. The [parseFile]{@link Csv#parseFile} method is a static
   * method, which is iterable over the column names of the table. The columns
   * then get set to the new table and the column names get set to the
   * `columnInformation` of the `Table`.
   *
   * @param{File} csvFile The CSV file
   * @param{Array<ColumnInformationOptionsInterface>} columnInformationOptions
   * The additional options for the columns
   * @returns The new Table in form of a `Promise`
   */
  public static async fromCSV(
    csvFile: File,
    columnInformationOptions?: Array<ColumnInformationOptionsInterface>
  ): Promise<Table> {
    return Csv.parseFile(csvFile).then(csv => {
      let columnInformation = new Array<ColumnInformation>();

      csv.forEachColumnName((columnName: string, index: number) => {
        let info = ColumnInformation.defaults.set({name: columnName});
        if (columnInformationOptions && columnInformationOptions[index]) {
          info = ColumnInformation.merge(info, columnInformationOptions[index])
        }

        columnInformation.push(info)
      });

      return new Table(csv.data, columnInformation);
    });
  }

  /**
   * Creates a {@link Table} from an `Array` of rows.
   *
   * The `Array` has to contain arrays of the data of the rows. The data then
   * gets set to the {@link Table} as well as the `columnInformation`.
   *
   * @param{Array<Array<any>>} rows The rows of the `Table`
   * @param{Array<ColumnInformationOptionsInterface>} columnInformation The
   * additional column information
   * @returns The new Table
   */
  public static fromRows(
    rows: Array<Array<any>>,
    columnInformation: Array<ColumnInformationOptionsInterface>
  ): Table {
    return new Table(rows, columnInformation.map(
      info => ColumnInformation.defaults.set(info)
    ));
  }

  /**
   * Creates a {@link Table} from a `JSON` object.
   *
   * The `JSON` object contains entries with column name as the key and the data
   * of the column as the entry to the correspronding key. The column data has
   * to be stored in an `Array`.
   *
   * The method maps each column to rows. Meaning, that it extracts each row
   * from the columns. This is necessary for the {@link Table} to properly store
   * the data.
   *
   * @param{Object} table The `JSON` object
   * @param{Array<ColumnInformationOptionsInterface>} columnInformationOptions
   * The additional column information
   * @returns The new Table
   */
  public static fromJSON(
    table: Object,
    columnInformationOptions?: Array<ColumnInformationOptionsInterface>
  ): Table {
    let entries = Object.entries(table);
    let columns = new Array<Array<any>>();
    let columnInformation = new Array<ColumnInformation>();

    entries.forEach((entry: any, index: number) => {
      if (Array.isArray(entry[1])) {
        columns.push(entry[1])
        let info = ColumnInformation.defaults.set({name: entry[0]});
        if (columnInformationOptions && columnInformationOptions[index]) {
          info = ColumnInformation.merge(info, columnInformationOptions[index])
        }
        columnInformation.push(info)
      }
    })

    return new Table(this.columnsToRows(columns), columnInformation);
  }

  /**
   * Returns the maximum length of all the columns.
   *
   * @param{Array<Array<any>>} columns The columns$
   * @returns The maximum length of all the columns
   */
  private static getMaxColumnLength(columns: Array<Array<any>>): number {
    let max = 0;
    columns.forEach(column => max = column.length > max ? column.length : max);
    return max;
  }

  /**
   * Transforms the columns into rows. This is necessary, when data is received
   * in form of columns instead of rows. The missing entries get filled up with
   * the character '-'.
   *
   * @param{Array<Array<any>>} columns The columns to transform
   * @returns The data in form of rows
   */
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
