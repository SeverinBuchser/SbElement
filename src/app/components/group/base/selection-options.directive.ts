import { Directive, Input } from '@angular/core';
import { SelectedOptions } from './selected-options';
import { ControlValueAccessorBase } from './control-value-accessor.base.directive';

@Directive({
  selector: '[selector]'
})
export class SelectionOptionsDirective<ValueType> extends ControlValueAccessorBase<ValueType> {

  public selectedOptions: SelectedOptions = {};
  protected _options: Array<string> = new Array<string>();

  @Input()
  set options(options: Array<string>) {
    this._options = options;
    this._options.forEach((option: string) => this.selectedOptions[option] = false);
  }

  get options(): Array<string> {return this._options}

}
