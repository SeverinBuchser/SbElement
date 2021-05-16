import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[selector]'
})
export class SizeColorInputDirective {

    @Input()
    public size: string | null = 'd';

    @Input()
    public color: string | null = 'primary';

}
