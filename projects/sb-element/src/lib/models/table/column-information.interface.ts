import { ColumnInformationOptionsInterface } from "./column-information-options.interface";

/**
 * Interface which must have all the fields for the column information. The
 * interface is beeing used to make sure that all the fields are acessible and
 * defined.
 */
export interface ColumnInformationInterface
  extends ColumnInformationOptionsInterface {
    /**
     * The name of the column.
     */
    name: string;

    /**
     * The `color` of the column.
     */
    color: string;

    /**
     * The `alignment` of the column.
     */
    alignment: string;
}
