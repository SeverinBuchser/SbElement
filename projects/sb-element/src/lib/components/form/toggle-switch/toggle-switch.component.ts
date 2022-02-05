import { Component, HostBinding, HostListener, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorSizeThemeColorInputDirective } from '../../../core/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive';

@Component({
  selector: 'sb-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ToggleSwitchComponent,
    multi: true
  }]
})
export class ToggleSwitchComponent extends ControlValueAccessorSizeThemeColorInputDirective<boolean> {

  public rootClass = 'sb-toggle-switch';

  @HostListener('click')
  public toggle(): void {
    this.value = !this.value;
  }

  @HostBinding('class')
  get classes(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.value ? 'on' : 'off');
    return classes;
  }

}
