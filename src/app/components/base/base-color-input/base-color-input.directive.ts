import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'base-color-input'
})
export class BaseColorInputDirective {

  @Input()
  public color: 'warn' | 'success' | 'info' | 'primary' | 'secondary' | null = 'primary';

}
