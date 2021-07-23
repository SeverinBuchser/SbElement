import { ColumnInformationOptionsInterface } from "./column-information-options.interface";

export interface ColumnInformationInterface
  extends ColumnInformationOptionsInterface {
  name: string;
  color: string;
  alignment: string;
}
