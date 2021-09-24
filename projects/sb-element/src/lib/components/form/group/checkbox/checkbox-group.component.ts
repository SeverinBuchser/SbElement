import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectedOptions } from '../../../../models/selected-options';
import { SelectionOptionsDirective } from '../base/selection-options.directive';

@Component({
  selector: 'sb-el-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CheckboxGroupComponent,
    multi: true
  }]
})
export class CheckboxGroupComponent extends SelectionOptionsDirective<SelectedOptions> {

  public rootClass = 'sb-el-checkbox-group';

  @Input()
  public groupTitle: string = '';

  @Input()
  public groupAlign: string | null = 'left';

  @Input()
  public labelPosition: string = 'right';

  check() {
    this.value = this.selectedOptions;
  }

  protected updateValues(): void {
    this.selectedOptions = this.value as SelectedOptions;
  }

}
