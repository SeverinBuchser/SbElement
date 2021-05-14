import { Directive, Input } from '@angular/core';
import { SelectedOptions } from './selected-options';
import { FormGroupBase } from './form-group.base.directive';

@Directive({
  selector: '[selector]'
})
export class SelectionOptionsDirective<ValueType> extends FormGroupBase<ValueType> {

  public selectedOptions: SelectedOptions = {};
  protected _options: Array<string> = new Array<string>();

  @Input()
  set options(options: Array<string>) {
    this._options = options;
    this._options.forEach((option: string) => this.selectedOptions[option] = false);
  }
  get options(): Array<string> {return this._options}

}
