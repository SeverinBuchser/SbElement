import { ColumnInformationInterface } from "./column-information.interface";

/**
 * An interface necessary for the {@link TableComponent} to be able to render
 * a table.
 */
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
