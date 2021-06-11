import { ColumnInformationInterface, ColumnInformationOptionsInterface } from "./column-information.interface";

export class ColumnInformationDefaults implements ColumnInformationInterface {
  public name: string = '';
  public color: string = '';
  public alignment: string = 'center';
}


export class ColumnInformation extends ColumnInformationDefaults {

  public static get defaults(): ColumnInformation {
    return new ColumnInformation();
  }

  public set(
    information: ColumnInformationOptionsInterface
  ): ColumnInformation {
    let clone = Object.assign({}, this);
    return Object.assign(clone, information);
  }

}
