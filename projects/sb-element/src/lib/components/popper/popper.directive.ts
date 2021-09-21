import { AfterViewInit, Directive } from '@angular/core';

@Directive({
  selector: '[selector]'
})
export class PopperDirective implements AfterViewInit {

  public align: () => void = () => {};
  public afterViewInit: () => void = () => {};

  public ngAfterViewInit(): void {
    this.align();
    this.afterViewInit();
  }

}
