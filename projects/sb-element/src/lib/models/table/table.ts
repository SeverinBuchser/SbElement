import { ColumnInformationInterface } from './column-information.interface';

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

  public static fromJSON(): void {

  }
}
