import { Attribute, Component, Input, Optional, ViewEncapsulation } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { SizeThemeColorInputDirective } from '../../core/style-input/size-theme-color-input.directive';

@Component({
  selector: 'sb-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlertBoxComponent extends SizeThemeColorInputDirective {

  public rootClass: string = 'sb-alert-box';

  @Input()
  public showArrow: boolean = true;

  @Input()
  public showIcon: boolean = true;

  @Input()
  public customIcon: boolean = false;

  public flipped: boolean = false;
  private pill: boolean = false;
  private plain: boolean = false;

  constructor(
    @Optional() @Attribute('flipped') flipped: any,
    @Optional() @Attribute('pill') pill: any,
    @Optional() @Attribute('plain') plain: any,
    themeService: ThemeService
  ) {
    super(themeService);
    if (flipped == '') this.flipped = true;
    if (pill == '') this.pill = true;
    if (plain == '') this.plain = true;
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.flipped ? 'flipped' : '');
    classes.push(this.pill ? 'pill' : '');
    classes.push(this.plain ? 'plain' : '');
    classes.push(!this.showArrow && !this.showIcon ? 'center' : '');
    return classes;
  }

}
