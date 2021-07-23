import { ColumnInformationInterface } from "./column-information.interface";

/**
 * The default column information. Holds default entries for the information.
 */
export class ColumnInformationDefaults implements ColumnInformationInterface {

  /**
   * The default `name` for each column.
   */
  public name: string = '';

  /**
   * The default `color` for each column.
   */
  public color: string = '';

  /**
   * The default `alignment` for each column.
   */
  public alignment: string = 'center';
}
