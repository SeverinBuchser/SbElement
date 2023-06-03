import { Component, Type } from '@angular/core';
import { CardExampleComponent } from '../../example/card';

@Component({
  selector: 'app-sb-card-module-doc',
  templateUrl: './sb-card-module-doc.component.html'
})
export class SbCardModuleDocComponent {

  get exampleComponent(): Type<CardExampleComponent> {
    return CardExampleComponent;
  }

}
