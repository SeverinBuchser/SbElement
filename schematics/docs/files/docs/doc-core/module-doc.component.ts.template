import { Component, Input, Type } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-module-doc',
  templateUrl: './module-doc.component.html',
  styleUrls: ['./module-doc.component.scss']
})
export class ModuleDocComponent {

  @Input()
  public exampleComponent!: Type<any>;
  
  get exampleComponentPortal(): ComponentPortal<any> {
    return new ComponentPortal(this.exampleComponent)
  }

}
