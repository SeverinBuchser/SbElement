import { ColumnInformationInterface } from "./column-information.interface";

export interface TableInterface {

  /**
   * Information about the columns.
   */
  columnInformation: Array<ColumnInformationInterface>;

  /**
   * The data of the table. The data is stored as an array of data for each row.
   * Each row contains the data for each column.
   */
  data: Array<Array<any>>;
}
