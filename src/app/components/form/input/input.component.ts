import { Attribute, Component, Input, Optional } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { ControlValueAccessorSizeThemeColorInputDirective } from '../../base/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive';

@Component({
  selector: 'sb-el-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputComponent,
    multi: true
  }]
})
export class InputComponent extends ControlValueAccessorSizeThemeColorInputDirective<string> {

  public rootClass = 'sb-el-input';

  @Input()
  public placeholder: string = '';

  @Input()
  public type: string = 'text';

  public plain: boolean = false;
  public pill: boolean = false;


  constructor(
    @Optional() @Attribute('pill') pill: any,
    @Optional() @Attribute('plain') plain: any,
    themeService: ThemeService
  ) {
    super(themeService);
    if (pill === '') this.pill = true;
    if (plain === '') this.plain = true;
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.pill ? 'is-pill' : '');
    classes.push(this.plain ? 'is-plain': '');
    return classes;
  }

}
