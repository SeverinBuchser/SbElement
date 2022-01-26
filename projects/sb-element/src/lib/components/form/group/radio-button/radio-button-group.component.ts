import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectionOptionsDirective } from '../base/selection-options.directive';

@Component({
  selector: 'sb-radio-button-group',
  templateUrl: './radio-button-group.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: RadioButtonGroupComponent,
    multi: true
  }]
})
export class RadioButtonGroupComponent extends SelectionOptionsDirective<string> {

  public rootClass = 'sb-form-group-options';

  @Input()
  public groupTitle: string = '';

  @Input()
  public groupAlign: string | null = 'left';

  @Input()
  public labelPosition: string = 'right';

  public check(newOption: string) {
    this.options.forEach((option: string) => {
      if (option !== newOption) this.selectedOptions[option] = false;
    })
    this.writeValueInnerChange(newOption);
  }

  protected updateValues(): void {
    this.options.forEach((option: string) => {
      if (option == this.value) {
        this.selectedOptions[option] = true;
      } else this.selectedOptions[option] = false;
    })
  }

}
