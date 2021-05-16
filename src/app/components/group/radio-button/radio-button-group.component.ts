import { Component, Input } from '@angular/core';
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

  @Input()
  public labelPosition: string = 'right';

  public change(newOption: string) {
    console.log("change", newOption)
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

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push('is-options');
    return classes;
  }

}
