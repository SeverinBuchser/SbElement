import { AfterViewInit, Directive } from '@angular/core';

@Directive({
  selector: '[sbElPopover]'
})
export class PopoverDirective implements AfterViewInit {

  constructor() { }

  public ngAfterViewInitFn: () => void = () => {};

  ngAfterViewInit(): void {
    this.ngAfterViewInitFn();
  }

}
