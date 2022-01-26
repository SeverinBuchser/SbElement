import { Attribute, Component, Input, Optional } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { SizeThemeColorInputDirective } from '../../../core/style-input/size-theme-color-input.directive';

@Component({
  selector: 'sb-icon-button',
  templateUrl: './icon-button.component.html'
})
export class IconButtonComponent extends SizeThemeColorInputDirective {

  public plain: boolean = false;
  public pill: boolean = false;
  public round: boolean = false;
  private _disabled: boolean = false;

  @Input()
  set disabled(isDisabled: boolean) {
    this._disabled = isDisabled;
  }
  get disabled(): boolean {
    return this._disabled;
  }

  @Input()
  public icon: string = '';

  constructor(
    @Optional() @Attribute('pill') pill: any,
    @Optional() @Attribute('round') round: any,
    @Optional() @Attribute('plain') plain: any,
    themeService: ThemeService
  ) {
    super(themeService);
    if (pill == '') this.pill = true;
    if (round == '') this.round = true;
    if (plain == '') this.plain = true;
  }

}
