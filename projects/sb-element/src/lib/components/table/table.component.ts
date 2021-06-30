import { Component, Input } from '@angular/core';
import { TableInterface } from "../../models/table/table.interface";
import { ThemeColorInputDirective } from '../base/style-input/theme-color-input.directive';

@Component({
  selector: 'sb-el-table',
  templateUrl: './table.component.html'
})
export class TableComponent extends ThemeColorInputDirective {

  public rootClass: string = 'sb-el-table';
  public subRootClass: string = this.rootClass + '__data';

  @Input()
  public separation: string = 'all';

  @Input()
  public table!: TableInterface;

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    if (this.separation === 'all') {
      classes.push('is-border-separation');
      classes.push('is-color-separation');
    } else if (this.separation) {
      classes.push('is-' + this.separation + '-separation');
    }
    return classes;
  }

  public getColumnClasses(columnIndex: number): Array<string> {
    let classes = new Array<string>();
    let columnInformation = this.table.columnInformation[columnIndex];
    classes.push(this.subRootClass);
    classes.push(this.subRootClass + '--' + columnInformation.color)
    classes.push('is-' + columnInformation.alignment)
    return classes;
  }

}
