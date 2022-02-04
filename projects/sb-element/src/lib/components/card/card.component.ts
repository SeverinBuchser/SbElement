import { Attribute, Component, HostBinding, Input, Optional, ViewEncapsulation } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { SizeThemeInputDirective } from '../../core';

@Component({
  selector: 'sb-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.hover]': 'hover',
    '[class.shadow]': 'shadow'
  }
})
export class CardComponent extends SizeThemeInputDirective {

  public rootClass: string = 'sb-card';

  @Input()
  public titleSeparator: boolean = true;

  @Input()
  public footerSeprator: boolean = true;

  private hover: boolean = false;
  private shadow: boolean = false;

  constructor(
    @Optional() @Attribute('hover') hover: any,
    @Optional() @Attribute('shadow') shadow: any,
    themeService: ThemeService
  ) {
    super(themeService);
    if (hover == '') this.hover = true;
    if (shadow == '') this.shadow = true;
  }

  @HostBinding('class')
  get classes(): Array<string> {
    let classes = super.getClasses();
    return classes;
  }

}
