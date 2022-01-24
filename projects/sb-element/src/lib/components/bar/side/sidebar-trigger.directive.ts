import { Directive, HostListener, Input } from '@angular/core';
import { SidebarComponent } from "./sidebar.component";

@Directive({
  selector: '[sbElSidebarTrigger]'
})
export class SidebarTriggerDirective {
  @HostListener('click', ['$event'])
  private handleClick(event: PointerEvent) {
    this.sbElSidebarTrigger.changeVisibility();
  }

  @Input()
  public sbElSidebarTrigger!: SidebarComponent;
}
