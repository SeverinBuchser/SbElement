import { AfterViewInit, Directive } from '@angular/core';

@Directive({
  selector: '[selector]'
})
export class PopperDirective implements AfterViewInit {

  public afterViewInit: () => void = () => {};

  public ngAfterViewInit(): void {
    this.afterViewInit();
  }

}
