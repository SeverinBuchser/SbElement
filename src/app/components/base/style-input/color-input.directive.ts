import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[selector]'
})
export class ColorInputDirective {

  @Input()
  public color: string | null = 'primary';

}
