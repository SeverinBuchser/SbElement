import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorSizeThemeColorInputDirective } from '../../../../core/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive';

@Component({
  selector: 'sb-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputComponent,
    multi: true
  }]
})
export class InputComponent extends ControlValueAccessorSizeThemeColorInputDirective<string> {

  public rootClass = 'sb-input';

  @Input()
  public border: boolean = true;

  @Input()
  public placeholder: string = '';

  @Input()
  public type: string = 'text';

  @Input()
  public spellcheck: boolean = false;

  @Input()
  public prefixIcon: string = '';
  @Input()
  public suffixIcon: string = '';

}
