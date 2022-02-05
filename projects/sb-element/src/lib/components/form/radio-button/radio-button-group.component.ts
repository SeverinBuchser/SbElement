import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorSizeThemeColorInputDirective } from '../../../core';

@Component({
  selector: 'sb-radio-button-group',
  templateUrl: './radio-button-group.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: RadioButtonGroupComponent,
    multi: true
  }]
})
export class RadioButtonGroupComponent extends ControlValueAccessorSizeThemeColorInputDirective<string> {

  public rootClass = 'sb-radio-group';

  @Input()
  public name: string = '';

  @Input()
  public options: Array<string> = new Array<string>();

}
