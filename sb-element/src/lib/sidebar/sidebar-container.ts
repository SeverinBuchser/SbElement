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
  templateUrl: './sidebar-container.html',
  styleUrls: ['./sidebar-container.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SbSidebarContainerComponent extends SbSidebarContainerCore {
  
  private side: SbConnectedSide = 'left';

  constructor(elementRef: ElementRef) {
    super(elementRef)
  }

  public enter(side: SbConnectedSide): void {
    this._elementRef.nativeElement.classList.remove(this.side);
    this._elementRef.nativeElement.classList.add(side);
    this.side = side;
    super.enter(side);
  }
  
}
