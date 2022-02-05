import { Component, HostBinding, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorSizeThemeColorInputDirective } from '../../../../core/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive';

@Component({
  selector: 'sb-input[type=double]',
  templateUrl: './double-input.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DoubleInputComponent,
    multi: true
  }]
})
export class DoubleInputComponent extends ControlValueAccessorSizeThemeColorInputDirective<Array<string>> {

  public rootClass = 'sb-input';
  
  @Input()
  public firstPlaceholder: string = '';

  @Input()
  public secondPlaceholder: string = '';

  @Input()
  public delimiter: string = ':';

  public _type: string = 'text';
  @Input()
  set type(type: string) {
    if (type != 'double') {
      this._type = type;
    }
  }
  get type(): string {
    return this._type;
  }

  @Input()
  public spellcheck: boolean = false;

  @Input()
  public prefixIcon: string = '';
  @Input()
  public suffixIcon: string = '';

  public firstValue: string = '';
  public secondValue: string = '';

  public handleInput(): void {
    this.writeValueInnerChange([this.firstValue, this.secondValue])
  }

  public updateValues(): void {
    if (this.value) {
      if (this.value.length > 0) this.firstValue = this.value[0];
      if (this.value.length > 1) this.secondValue = this.value[1];
    }
  }

  @HostBinding('class')
  get classes(): Array<string> {
    let classes = super.getClasses();
    return classes;
  }

}
