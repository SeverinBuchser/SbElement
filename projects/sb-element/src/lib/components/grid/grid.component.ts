import { Component, Input } from '@angular/core';
import { ClassNameInputDirective } from "../../core/style-input/class-name-input.directive";

@Component({
  selector: 'sb-grid',
  templateUrl: './grid.component.html'
})
export class GridComponent extends ClassNameInputDirective {

  public rootClass = 'sb-grid';

  @Input()
  public gap: string | null = null

  @Input()
  public dim: string = '2x2';

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.gap ? 'gap' + '--' + this.gap : '');
    return classes;
  }

}
