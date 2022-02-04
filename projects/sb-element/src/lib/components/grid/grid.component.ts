import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { ClassNameInputDirective } from "../../core/style-input/class-name-input.directive";

@Component({
  selector: 'sb-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridComponent extends ClassNameInputDirective {

  public rootClass = 'sb-grid';

  @Input()
  public gap: string | null = null

  @Input()
  set dim(dimensions: string) {
    let split = dimensions.split("x");
    this.column = "repeat(" + split[0] + ", auto)";
    this.row = "repeat(" + split[1] + ", auto)";
  }

  @HostBinding('style.gridTemplateColumns') column!: string;
  @HostBinding('style.gridTemplateRows') row!: string;

  @HostBinding('class')
  get classes(): Array<string> {
    let classes = super.getClasses();
    if (this.gap) {
      classes.push('gap' + '--' + this.gap);
    }
    return classes;
  }

}
