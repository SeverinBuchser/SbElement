import { Component, Input } from '@angular/core';
import { BaseColorInputComponent } from '../base-color-input/base-color-input.component';

@Component({
  selector: 'base-color-size-input',
  template: '',
  styles: []
})
export class BaseColorSizeInputComponent extends BaseColorInputComponent {

  @Input()
  public size: 's' | 'd' | 'm' | 'l' = 'd';

}
