import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { mixinClassName, Size, Triggerable } from '../../core';

const SbSidebarCore = mixinClassName(
  class {
    constructor(public _elementRef: ElementRef) {}
  }, 'sb-sidebar'
);

@Component({
  selector: 'sb-sidebar',
  templateUrl: './sidebar.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SbSidebarComponent extends SbSidebarCore implements Triggerable {

  @Input()
  public size: string = Size.MEDIUM;

  @Input()
  public side: 'left' | 'right' | 'top' | 'bottom' = 'left';

  @Input()
  public visible: boolean = false;

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }

  public trigger(): void {
    this.visible = !this.visible;
  }

  public getSidebarOverlayClasses(): Array<string> {
    let classes: Array<string> = new Array<string>();
    classes.push(this.className + '__overlay');
    if (this.visible) {
      classes.push('visible');
    }
    return classes;
  }
}
