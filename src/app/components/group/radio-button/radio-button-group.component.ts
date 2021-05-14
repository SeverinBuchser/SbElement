import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectionGroupBaseDirective } from '../base/selection-group-base.directive';

@Component({
  selector: 'sb-el-radio-button-group',
  templateUrl: './radio-button-group.component.html',
  styleUrls: ['./radio-button-group.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: RadioButtonGroupComponent,
    multi: true
  }]
})
export class RadioButtonGroupComponent extends SelectionGroupBaseDirective {

  change(newOption: any) {
    this.options.forEach((option) => {
      if (option !== newOption) this.selectedOptions[option] = false;
    })
    this.value = newOption;
  }

}
