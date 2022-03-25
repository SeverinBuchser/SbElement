import { ApplicationRef, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
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
}
