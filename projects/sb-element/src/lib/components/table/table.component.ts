import { Component, Input } from '@angular/core';
import { ThemeInputDirective } from '../../core';

@Component({
  selector: 'sb-el-table',
  templateUrl: './table.component.html'
})
export class TableComponent extends ThemeInputDirective {

  public rootClass: string = 'sb-el-table';

  @Input()
  public data: Array<Array<any>> = new Array<Array<any>>();

  @Input()
  public head: Array<any> = new Array<any>();

}
