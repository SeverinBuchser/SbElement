import { Component, Input } from '@angular/core';

@Component({
  selector: 'base-color-input',
  template: '',
  styles: []
})
export class BaseColorInputComponent {

  @Input()
  public color: 'warn' | 'success' | 'info' | 'primary' | 'secondary' | null = 'primary';

}
