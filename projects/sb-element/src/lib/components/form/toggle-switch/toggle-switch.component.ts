import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorSizeThemeColorInputDirective } from '../../base/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive';

@Component({
  selector: 'sb-el-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ToggleSwitchComponent,
    multi: true
  }]
})
export class ToggleSwitchComponent extends ControlValueAccessorSizeThemeColorInputDirective<boolean> {

  public rootClass = 'sb-el-toggle-switch';

  public toggle(): void {
    this.value = !this.value;
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.value ? 'is-on' : 'is-off');
    return classes;
  }

}