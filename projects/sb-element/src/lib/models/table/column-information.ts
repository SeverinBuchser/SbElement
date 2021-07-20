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

  public static merge(
    overwrite: ColumnInformationOptionsInterface,
    persistent: ColumnInformationOptionsInterface
  ): ColumnInformation {
    let info = new ColumnInformation();

    info.name = this.mergeValues(overwrite.name, persistent.name,
      this.defaults.name);
    info.color = this.mergeValues(overwrite.color, persistent.color,
      this.defaults.color);
    info.alignment = this.mergeValues(overwrite.alignment, persistent.alignment,
      this.defaults.alignment);

    return info;
  }

  private static mergeValues(overwrite: string | undefined, persistent: string | undefined, defaultValue: string): string {
    let value = defaultValue;
    if (overwrite && defaultValue !== overwrite) value = overwrite;
    if (persistent && defaultValue !== persistent) value = persistent;
    return value;
  }

}
