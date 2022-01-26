import { Component, Input } from '@angular/core';
import { ThemeInputDirective } from '../../../core';

@Component({
  selector: '[sb-el-table-head]',
  templateUrl: './table-head.component.html'
})
export class TableHeadComponent extends ThemeInputDirective {

  public rootClass = 'sb-el-table-head';

  @Input()
  public head: Array<any> = new Array<any>();

}
