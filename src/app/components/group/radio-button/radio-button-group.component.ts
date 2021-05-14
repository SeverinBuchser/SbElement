import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectionOptionsDirective } from '../base/selection-options.directive';

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
export class RadioButtonGroupComponent extends SelectionOptionsDirective<string> {

  change(newOption: string) {
    this.options.forEach((option: string) => {
      if (option !== newOption) this.selectedOptions[option] = false;
    })
    this.writeValueInnerChange(newOption);
  }

  protected updateValues(): void {
    if (!this.innerChange) {
      this.options.forEach((option: string) => {
        if (option === this.value) {
          this.selectedOptions[option] = true;
        } else this.selectedOptions[option] = false;
      })
    }
  }

  get classes(): Array<string> {
    let classes = new Array<string>();
    classes.push('sb-radio-button-group');
    classes.push('sb-form-group');
    classes.push('is-options');
    classes.push('sb-form-group--' + this.size);
    classes.push('sb-form-group--' + this.theme + '-' + this.color);
    return classes;
  }

}
