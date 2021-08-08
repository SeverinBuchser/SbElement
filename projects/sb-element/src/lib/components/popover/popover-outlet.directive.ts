import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[sbElPopoverOutlet]'
})
export class PopoverOutletDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
