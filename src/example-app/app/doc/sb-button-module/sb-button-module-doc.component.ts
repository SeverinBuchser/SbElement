import { Component, Type } from '@angular/core';
import { ButtonExampleComponent } from '../../example/button';

@Component({
  selector: 'app-sb-button-module-doc',
  templateUrl: './sb-button-module-doc.component.html'
})
export class SbButtonModuleDocComponent {

  get exampleComponent(): Type<ButtonExampleComponent> {
    return ButtonExampleComponent;
  }

}
