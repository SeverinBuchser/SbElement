import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorSizeThemeColorInputDirective } from '../../../../core';

@Component({
  selector: 'sb-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CheckboxGroupComponent,
    multi: true
  }]
})
export class CheckboxGroupComponent extends ControlValueAccessorSizeThemeColorInputDirective<boolean> {

  public rootClass = 'sb-checkbox-group';

  @Input()
  public name: string = '';

  set options(options: Array<string>) {

  }
  get options(): Array<string> {
    return new Array<string>();
  }

}
