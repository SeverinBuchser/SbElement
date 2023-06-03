import { Component, Type } from '@angular/core';
import { BreadcrumbsExampleComponent } from '../../example/breadcrumbs';

@Component({
  selector: 'app-sb-breadcrumbs-module-doc',
  templateUrl: './sb-breadcrumbs-module-doc.component.html'
})
export class SbBreadcrumbsModuleDocComponent {

  get exampleComponent(): Type<BreadcrumbsExampleComponent> {
    return BreadcrumbsExampleComponent;
  }

}
