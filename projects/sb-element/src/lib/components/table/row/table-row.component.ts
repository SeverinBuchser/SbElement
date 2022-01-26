import { Component, Input } from '@angular/core';
import { ThemeInputDirective } from '../../../core';

@Component({
  selector: '[sb-el-table-row]',
  templateUrl: './table-row.component.html'
})
export class TableRowComponent extends ThemeInputDirective {

  public rootClass = 'sb-el-table-row';

  @Input()
  public row: Array<any> = new Array<any>();

}
