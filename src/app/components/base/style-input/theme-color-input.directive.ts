import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[selector]'
})
export class ThemeColorInputDirective {

  @Input()
  public theme: string | null = 'light';

  @Input()
  public color: string | null = 'primary';

}
