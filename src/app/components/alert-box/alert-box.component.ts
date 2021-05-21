import { Attribute, Component, Input, Optional } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { SizeThemeColorInputDirective } from '../base/style-input/size-theme-color-input.directive';

@Component({
  selector: 'sb-el-alert-box',
  templateUrl: './alert-box.component.html'
})
export class AlertBoxComponent extends SizeThemeColorInputDirective {

  public rootClass: string = 'sb-el-alert-box';

  @Input()
  public showArrow: boolean = true;

  @Input()
  public showIcon: boolean = true;

  @Input()
  public customIcon: boolean = false;

  private flipped: boolean = false;

  constructor(
    @Optional() @Attribute('flipped') flipped: any,
    themeService: ThemeService
  ) {
    super(themeService);
    if (flipped == '') this.flipped = true;
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.flipped ? 'is-flipped' : '');
    return classes;
  }

}
