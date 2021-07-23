/**
 * Defines an interface for the column information. These are fields every
 * object regarding the column information can poesess. The fields are all
 * optional, for easier definition of the information.
 */
export interface ColumnInformationOptionsInterface {

  /**
   * The name of the column.
   */
  name?: string;

  /**
   * The `color` of the column.
   */
  color?: string;

  /**
   * The `alignment` of the column.
   */
  alignment?: string;
}
