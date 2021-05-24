import { Component, Input } from '@angular/core';
import { TableAbstract } from '../../models/table/table.abstract';
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
  public table!: TableAbstract;

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
    let columnInformation = this.table.getColumnInformation(columnIndex);
    classes.push(this.subRootClass);
    classes.push(this.subRootClass + '--' + columnInformation.color)
    classes.push('is-' + columnInformation.alignment)
    return classes;
  }

}
