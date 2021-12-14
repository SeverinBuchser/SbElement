import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemeService } from "../../../services/theme/theme.service";
import { ControlValueAccessorSizeThemeColorInputDirective } from '../../base/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive';

@Component({
  selector: 'sb-el-radio-button',
  templateUrl: './radio-button.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: RadioButtonComponent,
    multi: true
  }]
})
export class RadioButtonComponent extends ControlValueAccessorSizeThemeColorInputDirective<boolean> {

  @Input()
  public label: string = '';
  @Input()
  public labelPosition: string = 'right';

  constructor(themeService: ThemeService) {
    super(themeService);
    this.rootClass = 'sb-el-radio-button';
  }

  public check(): void {
    this.value = true;
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.value ? 'is-checked' : 'is-unchecked');
    classes.push(this.label ? 'is-label' : '');
    classes.push(this.label ? 'label-is-' + this.labelPosition : '');
    return classes;
  }

}
