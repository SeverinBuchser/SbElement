import { AfterViewInit, Directive } from '@angular/core';

@Directive({
  selector: '[selector]'
})
export class PopoverDirective implements AfterViewInit {

  public afterViewInit: () => void = () => {};

  public ngAfterViewInit(): void {
    this.afterViewInit();
  }

}
