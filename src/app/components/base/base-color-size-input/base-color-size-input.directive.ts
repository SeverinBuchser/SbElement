import { Directive, Input } from '@angular/core';
import { BaseColorInputDirective } from '../base-color-input/base-color-input.directive';

@Directive({
  selector: 'base-color-size-input'
})
export class BaseColorSizeInputDirective extends BaseColorInputDirective {

  @Input()
  public size: 's' | 'd' | 'm' | 'l' = 'd';

}
