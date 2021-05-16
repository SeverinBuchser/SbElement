import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[selector]'
})
export class SizeThemeColorInputDirective {

  @Input()
  public size: string | null = 'd';

  @Input()
  public theme: string | null = 'light';

  @Input()
  public color: string | null = 'primary';

}
