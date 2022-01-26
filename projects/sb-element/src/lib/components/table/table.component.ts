import { Component, Input } from '@angular/core';
import { ThemeColorInputDirective } from '../../core';

@Component({
  selector: 'sb-el-table',
  templateUrl: './table.component.html'
})
export class TableComponent extends ThemeColorInputDirective {

  public rootClass: string = 'sb-el-table';

  @Input()
  public head: Array<any> = new Array<any>();

  @Input()
  public body: Array<Array<any>> = new Array<Array<any>>();

}
