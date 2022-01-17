import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorSizeThemeColorInputDirective } from '../../../../core/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive';

@Component({
  selector: 'sb-el-double-input',
  templateUrl: './double-input.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DoubleInputComponent,
    multi: true
  }]
})
export class DoubleInputComponent extends ControlValueAccessorSizeThemeColorInputDirective<string> {

  public rootClass = 'sb-el-double-input';

  @Input()
  public firstPlaceholder: string = '';

  @Input()
  public secondPlaceholder: string = '';

  @Input()
  public delimiter: string = ':';

  @Input()
  public type: string = 'text';

  @Input()
  public spellcheck: boolean = false;

  @Input()
  public firstPrefixIcon: string = '';
  @Input()
  public secondPrefixIcon: string = '';
  @Input()
  public firstSuffixIcon: string = '';
  @Input()
  public secondSuffixIcon: string = '';

  public getInputClasses(): Array<string> {
    let classes = new Array<string>();
    classes.push(this.rootClass + '__input')
    return classes;
  }

}
