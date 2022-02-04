import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { ClassNameInputDirective } from "../../core/style-input";

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
  public justify: 'even' | 'auto' = 'auto';

  @Input()
  set dim(dimensions: string) {
    let split = dimensions.split("x");
    let justify = this.justify == 'even' ? '1fr' : this.justify;
    this.column = `repeat(${split[0]}, ${justify})`;
    this.row = `repeat(${split[1]}, ${justify})`;
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
