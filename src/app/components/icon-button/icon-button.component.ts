import { Attribute, Component, Optional } from '@angular/core';
import { BaseThemeSizeInputDirective } from '../base/base-theme-size-input/base-theme-size-input.directive';

@Component({
  selector: 'sb-el-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent extends BaseThemeSizeInputDirective {

  public plain: boolean = false;
  public pill: boolean = false;
  public round: boolean = false;

  constructor(
    @Optional() @Attribute('pill') pill: any,
    @Optional() @Attribute('round') round: any,
    @Optional() @Attribute('plain') plain: any
  ) {
    super();
    if (pill === '') this.pill = true;
    if (round === '') this.round = true;
    if (plain === '') this.plain = true;
  }

}
