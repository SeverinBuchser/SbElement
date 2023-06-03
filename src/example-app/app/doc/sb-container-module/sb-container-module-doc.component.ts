import { Component, Type } from '@angular/core';
import { ContainerExampleComponent } from '../../example/container';

@Component({
  selector: 'app-sb-container-module-doc',
  templateUrl: './sb-container-module-doc.component.html'
})
export class SbContainerModuleDocComponent {

  get exampleComponent(): Type<ContainerExampleComponent> {
    return ContainerExampleComponent;
  }

}
