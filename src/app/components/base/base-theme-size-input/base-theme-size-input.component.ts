import { Component, Input } from '@angular/core';
import { BaseThemeInputComponent } from '../base-theme-input/base-theme-input.component';

@Component({
  selector: 'app-base-theme-size-input',
  template: '',
  styles: []
})
export class BaseThemeSizeInputComponent extends BaseThemeInputComponent {

  @Input()
  public size: 's' | 'd' | 'm' | 'l' = 'd';

}
