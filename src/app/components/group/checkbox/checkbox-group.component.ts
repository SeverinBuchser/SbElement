import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectedOptions } from '../base/selected-options';
import { SelectionOptionsDirective } from '../base/selection-options.directive';

@Component({
  selector: 'sb-el-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CheckboxGroupComponent,
    multi: true
  }]
})
export class CheckboxGroupComponent extends SelectionOptionsDirective<SelectedOptions> {

  change() {
    this.value = this.selectedOptions;
  }

  protected updateValues(): void {
    this.selectedOptions = this.value as SelectedOptions;
  }

}
