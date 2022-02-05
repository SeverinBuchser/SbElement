import { Attribute, Component, HostBinding, Input, Optional, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemeService } from '../../../services/theme/theme.service';
import { ControlValueAccessorSizeThemeColorInputDirective } from '../../../core';

@Component({
  selector: 'sb-select-button',
  templateUrl: './select-button.component.html',
  styleUrls: ['./select-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.pill]': 'pill',
    '[class.plain]': 'plain',
  },
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SelectButtonComponent,
    multi: true
  }]
})
export class SelectButtonComponent extends ControlValueAccessorSizeThemeColorInputDirective<string> {

  public rootClass = 'sb-select-button';

  public plain: boolean = false;
  public pill: boolean = false;
  public showOptions: boolean = false;

  @Input()
  public options: Array<string> = new Array<string>();

  constructor(
    @Optional() @Attribute('pill') pill: any,
    @Optional() @Attribute('plain') plain: any,
    themeService: ThemeService
  ) {
    super(themeService);
    if (pill == '') this.pill = true;
    if (plain == '') this.plain = true;
  }

  public toggle(): void {
    this.showOptions = !this.showOptions;
  }

  public select(newOption: string) {
    this.toggle();
    this.writeValueInnerChange(newOption);
  }
  
  @HostBinding('class')
  get classes(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.showOptions ? 'open' : 'closed');
    return classes;
  }
}
