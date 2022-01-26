import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorSizeThemeColorInputDirective } from '../../../core/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive';

@Component({
  selector: 'sb-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ToggleSwitchComponent,
    multi: true
  }]
})
export class ToggleSwitchComponent extends ControlValueAccessorSizeThemeColorInputDirective<boolean> {

  public rootClass = 'sb-toggle-switch';

  public toggle(): void {
    this.value = !this.value;
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.value ? 'is-on' : 'is-off');
    return classes;
  }

}
