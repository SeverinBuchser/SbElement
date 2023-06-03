import { Component, Type } from '@angular/core';
import { AlertExampleComponent } from '../../example/alert';

@Component({
  selector: 'app-sb-alert-module-doc',
  templateUrl: './sb-alert-module-doc.component.html'
})
export class SbAlertModuleDocComponent {

  get exampleComponent(): Type<AlertExampleComponent> {
    return AlertExampleComponent;
  }

}
