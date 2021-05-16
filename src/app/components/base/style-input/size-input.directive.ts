import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[selector]'
})
export class SizeInputDirective {

  @Input()
  public size: string | null = 'd';

}
