import { Directive, Input } from '@angular/core';
import { BaseThemeInputDirective } from '../base-theme-input/base-theme-input.directive';

@Directive({
  selector: 'app-base-theme-size-input'
})
export class BaseThemeSizeInputDirective extends BaseThemeInputDirective{

  @Input()
  public size: 's' | 'd' | 'm' | 'l' = 'd';

}
