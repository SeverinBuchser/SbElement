import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorThemeColorInputDirective } from '../../../core';

@Component({
  selector: 'sb-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: RadioButtonComponent,
    multi: true
  }]
})
export class RadioButtonComponent extends ControlValueAccessorThemeColorInputDirective<string> {

  public rootClass = 'sb-radio';

  private static id: number = 0;

  @Input()
  public name: string = '';

  @Input()
  public label: string = '';

}
