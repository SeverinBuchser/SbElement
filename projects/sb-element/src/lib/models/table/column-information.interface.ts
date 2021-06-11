export interface ColumnInformationOptionsInterface {
  name?: string;
  color?: string;
  alignment?: string;
}

export interface ColumnInformationInterface
  extends ColumnInformationOptionsInterface {
  name: string;
  color: string;
  alignment: string;
}
