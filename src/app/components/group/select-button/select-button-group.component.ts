import { Component } from '@angular/core';
import { SelectionOptionsDirective } from '../base/selection-options.directive';

@Component({
  selector: 'sb-el-select',
  templateUrl: './select-button-group.component.html',
  styleUrls: ['./select-button-group.component.scss']
})
export class SelectButtonGroupComponent extends SelectionOptionsDirective<string> {

  constructor() {
    super();
  }
}
