import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'app-base-size-input'
})
export class BaseSizeInputDirective {

  @Input()
  public size: 's' | 'd' | 'm' | 'l' = 'd';

}
