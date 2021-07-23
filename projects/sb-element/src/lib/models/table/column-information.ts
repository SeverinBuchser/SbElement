import { ColumnInformationDefaults } from "./column-information-defaults";
import { ColumnInformationOptionsInterface } from "./column-information-options.interface";

/**
 * A class providing different methods for handling column information. The
 * class provides a default version of itself via the
 * {@link ColumnInformationDefaults} class as well as options to merge
 * information and clone the information.
 *
 * All the interfaces and classes surrounding this class are needed for the case
 * that a user of the library wants to create new column information objects but
 * does not care about the methods. A simple object can be created and passed on
 * to the different methods, without caring about the details.
 */
export class ColumnInformation extends ColumnInformationDefaults {

  /**
   * Creates and returns a new default {@link ColumnInformation} object.
   *
   * @returns A new `ColumnInformation` object
   */
  public static get defaults(): ColumnInformation {
    return new ColumnInformation();
  }

  /**
   * Clones the current object into a new one.
   *
   * @returns A clone of the current object
   */
  private clone(): ColumnInformation {
    let clone = new ColumnInformation();
    clone.name = this.name;
    clone.color = this.color;
    clone.alignment = this.alignment;
    return clone;
  }

  /**
   * Clones the current object and sets the new information to the clone.
   *
   * The method uses the [merge]{@link #merge} method to clone and merge the
   * new values into the clone, so that the new values always get written to the
   * clone.
   *
   * @param{ColumnInformationOptionsInterface} information The new information
   * to write to the clone
   * @returns A clone with the updated values
   */
  public cloneAndSet(
    information: ColumnInformationOptionsInterface
  ): ColumnInformation {
    return ColumnInformation.merge(this, information);
  }

  /**
   * Merges two column information objects into a new one.
   *
   * Since the two input object do not have to contain any information, the new
   * object defaults to the default values, if no value is available for the new
   * object. If values are available, the `persistent` values always overwrite
   * the `overwrite` values.
   *
   * @param{ColumnInformationOptionsInterface} overwrite The object to overwrite
   * @param{ColumnInformationOptionsInterface} persistent The object not to
   * overwrite
   * @returns A merged version of the two input objects
   */
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

  /**
   * Merges two values into one, with the option of a fallback.
   *
   * The default value must always be supplied and not `null`. If both values,
   * `overwrite` and `persistent` are `undefined`, the default value will be the
   * output of the method. If only one of the input values is `defined`, the
   * `defined` value will be the output. If both of the inputs are `defined`,
   * the `persistent` value will be the output.
   *
   * @param{string | undefined} overwrite The value to be overwritten
   * @param{string | undefined} persistent The value not to overwrite
   * @param{string} defaultValue The fallback value
   * @returns A merged value of the three input values
   */
  private static mergeValues(
    overwrite: string | undefined,
    persistent: string | undefined,
    defaultValue: string
  ): string {
    let value = defaultValue;
    if (overwrite && defaultValue !== overwrite) value = overwrite;
    if (persistent && defaultValue !== persistent) value = persistent;
    return value;
  }

}
