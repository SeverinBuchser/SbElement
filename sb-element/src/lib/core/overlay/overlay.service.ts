import {
  ApplicationRef,
  ComponentRef,
  Injectable,
  Injector,
  NgModuleRef,
  Type,
  ViewContainerRef } from '@angular/core';
import { SbOverlayOutletComponent } from './overlay-outlet';

@Injectable({
  providedIn: 'root'
})
export class SbOverlayService {
  private appView: ViewContainerRef;

  constructor(private appRef: ApplicationRef) {
    this.appView = this.appRef.components[0].injector.get(ViewContainerRef);
  }

  public create<C extends SbOverlayOutletComponent>(
    componentType: Type<C>,
    options?: {
      index?: number;
      injector?: Injector;
      ngModuleRef?: NgModuleRef<unknown>;
      projectableNodes?: Array<Array<Node>>;
    }
  ): ComponentRef<C> {
    return this.appView.createComponent<C>(componentType, options);
  }
}
