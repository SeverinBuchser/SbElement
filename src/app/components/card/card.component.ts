import { Attribute, Component, Optional } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { SizeThemeColorInputDirective } from '../base/style-input/size-theme-color-input.directive';

@Component({
  selector: 'sb-el-card',
  templateUrl: './card.component.html'
})
export class CardComponent extends SizeThemeColorInputDirective {

  public rootClass: string = 'sb-el-card';

  private hover: boolean = false;

  constructor(
    @Optional() @Attribute('hover') hover: any,
    themeService: ThemeService
  ) {
    super(themeService);
    if (hover === '') this.hover = true;
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.hover ? 'is-hover' : '');
    return classes;
  }

}
