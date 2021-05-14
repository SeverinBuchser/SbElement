import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectionGroupBaseDirective } from '../base/selection-group-base.directive';

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
export class CheckboxGroupComponent extends SelectionGroupBaseDirective {

  change() {
    this.value = this.selectedOptions;
  }

}
