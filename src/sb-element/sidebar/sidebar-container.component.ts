import {
  Component, ElementRef, ViewEncapsulation
} from '@angular/core';
import {
  mixinClassName, SbConnectedSide, SbSlidableOverlayContainerComponent
} from '../core';

const SbSidebarContainerCore = mixinClassName(
  SbSlidableOverlayContainerComponent, 
  'sb-sidebar-container'
);

@Component({
  selector: 'sb-sidebar-container',
  templateUrl: './sidebar-container.component.html',
  styleUrls: ['./sidebar-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SbSidebarContainerComponent extends SbSidebarContainerCore {
  
  private _side: SbConnectedSide = 'left';

  constructor(elementRef: ElementRef) {
    super(elementRef)

    this._params.outsideOpacity = 1;
  }

  public updateSide(side: SbConnectedSide): void {
    this._elementRef.nativeElement.classList.remove(this._side);
    this._elementRef.nativeElement.classList.add(side);
    this._side = side;
  }

  public enter(side: SbConnectedSide): void {
    this.updateSide(side);
    super.enter(side);
  }
  
}
