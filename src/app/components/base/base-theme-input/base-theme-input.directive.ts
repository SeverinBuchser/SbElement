import { Directive, Input } from '@angular/core';
import { BaseColorInputDirective } from '../base-color-input/base-color-input.directive';

@Directive({
  selector: 'base-theme-input'
})
export class BaseThemeInputDirective extends BaseColorInputDirective {

  @Input()
  public theme: 'light' | 'night' = 'light';

}
