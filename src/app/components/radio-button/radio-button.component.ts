import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorSizeColorInputDirective } from '../base/control-value-accessor-style-input/control-value-accessor-size-color-input.directive';

@Component({
  selector: 'sb-el-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: RadioButtonComponent,
    multi: true
  }]
})
export class RadioButtonComponent extends ControlValueAccessorSizeColorInputDirective<boolean> {

  @Input()
  public label: string = '';
  @Input()
  public labelPosition: string = 'right';

  constructor() {
    super();
    this.rootClass = 'sb-el-radio-button';
  }

  public check(): void {
    this.value = true;
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.value ? 'is-checked' : 'is-unchecked');
    classes.push(this.label ? 'is-label' : '');
    classes.push(this.label ? 'label-is-' + this.labelPosition : '');
    classes.push(this.disabled ? 'disabled' : '');
    return classes;
  }

}
