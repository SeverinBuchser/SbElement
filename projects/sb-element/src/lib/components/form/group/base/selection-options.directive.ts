import { Directive, Input } from '@angular/core';
import { SelectedOptions } from './../../../../models/selected-options';
import { ControlValueAccessorSizeThemeColorInputDirective } from '../../../../components/base/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive';

@Directive({
  selector: '[selector]'
})
export class SelectionOptionsDirective<ValueType> extends ControlValueAccessorSizeThemeColorInputDirective<ValueType> {

  public selectedOptions: SelectedOptions = {};
  protected _options: Array<string> = new Array<string>();

  @Input()
  set options(options: Array<string>) {
    this._options = options;
    this._options.forEach((option: string) => this.selectedOptions[option] = false);
  }
  get options(): Array<string> {return this._options}

}
