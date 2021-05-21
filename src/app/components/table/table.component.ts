import { Component, Input } from '@angular/core';
import { TableInterface } from 'src/app/models/table/table-interface';
import { ThemeColorInputDirective } from '../base/style-input/theme-color-input.directive';

@Component({
  selector: 'sb-el-table',
  templateUrl: './table.component.html'
})
export class TableComponent extends ThemeColorInputDirective {

  public rootClass: string = 'sb-el-table';

  @Input()
  public table!: TableInterface;

  public getTableHeaderClasses(): Array<string> {
    let classes = new Array<string>();
    classes.push(this.rootClass + '__header');
    classes.push(this.rootClass + '__row');
    return classes;
  }

}
