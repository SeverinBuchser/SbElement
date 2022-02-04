import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorThemeColorInputDirective } from '../../../core';

@Component({
  selector: 'sb-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CheckboxComponent,
    multi: true
  }]
})
export class CheckboxComponent extends ControlValueAccessorThemeColorInputDirective<boolean> {

  public rootClass = 'sb-checkbox';

  @Input()
  public name: string = '';

  @Input()
  public label: string = '';

}
