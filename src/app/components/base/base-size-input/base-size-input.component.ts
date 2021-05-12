import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-base-size-input',
  template: '',
  styles: []
})
export class BaseSizeInputComponent {
  
  @Input()
  public size: 's' | 'd' | 'm' | 'l' = 'd';

}
