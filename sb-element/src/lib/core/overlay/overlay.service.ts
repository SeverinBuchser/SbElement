import { ApplicationRef, ComponentRef, Injectable, Injector, NgModuleRef, Type, ViewContainerRef } from '@angular/core';
import { SbOverlayComponent } from './overlay.component';

@Injectable({
  providedIn: 'root'
})
export class SbOverlayService {
  private appView: ViewContainerRef;

  constructor(
    private appRef: ApplicationRef
  ) {
    this.appView = this.appRef.components[0].injector.get(ViewContainerRef);
  }

  public create(): ComponentRef<SbOverlayComponent> {
    return this.appView.createComponent(SbOverlayComponent);
  }

  public createCustom<C extends SbOverlayComponent>(
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
