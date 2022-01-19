import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[sbElGrid]'
})
export class GridDirective {

  @Input()
  set sbElGrid(dimensions: string) {
    let split = dimensions.split("x");
    this.column = "repeat(" + split[0] + ", auto)";
    this.row = "repeat(" + split[1] + ", auto)";
  }

  @HostBinding('style.gridTemplateColumns') column!: string;
  @HostBinding('style.gridTemplateRows') row!: string;

}
