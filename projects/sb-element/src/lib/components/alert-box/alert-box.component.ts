import { Attribute, Component, HostBinding, Input, Optional, ViewEncapsulation } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { SizeThemeColorInputDirective } from '../../core/style-input/size-theme-color-input.directive';

@Component({
  selector: 'sb-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.pill]': 'pill',
    '[class.plain]': 'plain',
    '[class.center]': '!showArrow && !showIcon'
  }
})
export class AlertBoxComponent extends SizeThemeColorInputDirective {

  public rootClass = 'sb-alert-box';

  @Input()
  public showArrow: boolean = true;

  @Input()
  public showIcon: boolean = true;

  @Input()
  public customIcon: boolean = false;

  private pill: boolean = false;
  private plain: boolean = false;

  constructor(
    @Optional() @Attribute('pill') pill: any,
    @Optional() @Attribute('plain') plain: any,
    themeService: ThemeService
  ) {
    super(themeService);
    if (pill == '') this.pill = true;
    if (plain == '') this.plain = true;
  }

  @HostBinding('class')
  get classes(): Array<string> {
    let classes = super.getClasses();
    return classes;
  }

}
