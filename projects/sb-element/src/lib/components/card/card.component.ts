import { Attribute, Component, Optional } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { SizeThemeInputDirective } from '../../core/style-input/size-theme-input.directive';

@Component({
  selector: 'sb-el-card',
  templateUrl: './card.component.html'
})
export class CardComponent extends SizeThemeInputDirective {

  public rootClass: string = 'sb-el-card';

  private hover: boolean = false;
  private shadow: boolean = false;

  constructor(
    @Optional() @Attribute('hover') hover: any,
    @Optional() @Attribute('shadow') shadow: any,
    themeService: ThemeService
  ) {
    super(themeService);
    if (hover === '') this.hover = true;
    if (shadow === '') this.shadow = true;
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.hover ? 'is-hover' : '');
    classes.push(this.shadow ? 'is-shadow' : '');
    return classes;
  }

}
