import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorSizeThemeColorInputDirective } from '../../../../core/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive';

@Component({
  selector: 'sb-input-core',
  templateUrl: './input-core.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputCoreComponent,
    multi: true
  }]
})
export class InputCoreComponent extends ControlValueAccessorSizeThemeColorInputDirective<string> {

  public rootClass = 'sb-input-core';

  @Input()
  public placeholder: string = '';

  @Input()
  public type: string = 'text';

  @Input()
  public spellcheck: boolean = false;

  public getInputClasses(): Array<string> {
    let classes = new Array<string>();
    classes.push(this.rootClass + '__input')
    return classes;
  }

  public getPlaceholderClasses(): Array<string> {
    let classes = new Array<string>();
    classes.push(this.rootClass + '__placeholder')
    classes.push(this.value || this.focused ? 'is-top' : '')
    return classes;
  }

}
