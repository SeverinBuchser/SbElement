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

  private clone(): ColumnInformation {
    let clone = new ColumnInformation();
    clone.name = this.name;
    clone.color = this.color;
    clone.alignment = this.alignment;
    return clone;
  }

  public set(
    information: ColumnInformationOptionsInterface
  ): ColumnInformation {
    let clone = Object.assign({}, this);
    return Object.assign(clone, information);
  }

}
