import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[sb-el-popover-outlet-directive]'
})
export class PopoverOutletDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
