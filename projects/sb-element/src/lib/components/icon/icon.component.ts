import { Attribute, Component, Input, Optional, ViewEncapsulation } from '@angular/core';
import { ThemeService } from "../../services/theme/theme.service";
import { SizeThemeColorInputDirective } from '../../core';

@Component({
  selector: 'sb-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IconComponent extends SizeThemeColorInputDirective {

  public rootClass = 'sb-icon';

  @Input()
  public icon: string = '';

  @Input()
  set isOutline(isOutline: boolean) {
    this.outline = isOutline;
  }

  private outline: boolean = false;

  constructor(
    themeService: ThemeService,
    @Optional() @Attribute('outline') outline: any
  ) {
    super(themeService);
    if (outline == '') this.isOutline = true;
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.outline ? 'outline' : '');
    return classes;
  }

}
