import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorSizeThemeColorInputDirective } from '../../../core/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive';

@Component({
  selector: 'sb-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CheckboxComponent,
    multi: true
  }]
})
export class CheckboxComponent extends ControlValueAccessorSizeThemeColorInputDirective<boolean> {

  public rootClass = 'sb-checkbox';

  @Input()
  public label: string = '';
  @Input()
  public labelPosition: string = 'right';

  public check(): void {
    this.value = !this.value;
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.label ? 'label' : '');
    classes.push(this.label ? 'label-' + this.labelPosition : '');
    classes.push(this.value ? 'checked' : 'unchecked');
    return classes;
  }

}
