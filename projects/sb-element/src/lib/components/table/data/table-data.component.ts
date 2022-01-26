import { Component, Input } from '@angular/core';
import { ThemeInputDirective } from '../../../core';

@Component({
  selector: '[sb-el-table-data]',
  templateUrl: './table-data.component.html'
})
export class TableDataComponent extends ThemeInputDirective {

  public rootClass = 'sb-el-td';

  @Input()
  public data: any = '';

  @Input()
  public alignment: string = 'center';

  public getClasses(): Array<string> {
    let classes = super.getClasses()
    classes.push(this.alignment);
    return classes;
  }

}
