import { Component, Input } from '@angular/core';
import { BaseColorInputComponent } from '../base-color-input/base-color-input.component';

@Component({
  selector: 'base-theme-input',
  template: '',
  styles: []
})
export class BaseThemeInputComponent extends BaseColorInputComponent {

  @Input()
  public theme: 'light' | 'night' = 'light';

}
