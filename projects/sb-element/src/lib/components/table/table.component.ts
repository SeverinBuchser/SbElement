import { Attribute, Component, Input, Optional } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { ThemeColorInputDirective } from '../../core';

@Component({
  selector: 'sb-table',
  templateUrl: './table.component.html'
})
export class TableComponent extends ThemeColorInputDirective {

  public rootClass: string = 'sb-table';

  @Input()
  set isPlain(isPlain: boolean) {
    this.plain = isPlain;
  }

  private plain: boolean = false;

  @Input()
  public alignment: 'left' | 'center' | 'right' = 'center';

  @Input()
  public head: Array<any> = new Array<any>();

  @Input()
  public body: Array<Array<any>> = new Array<Array<any>>();

  constructor(
    @Optional() @Attribute('plain') plain: any,
    themeService: ThemeService
  ) {
    super(themeService);
    if (plain === '') this.isPlain = true;
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    if (this.plain) {
      classes.push('plain');
    }
    classes.push(this.alignment);
    return classes;
  }

}
