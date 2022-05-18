import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[sbCollapse]'
})
export class SbCollapseDirective {

  get expandedHeight() {
    let children = this._elementRef.nativeElement.children;
    let sum = 0;
    for (let i = 0 ; i < children.length ; i++) {
      sum += children.item(i).offsetHeight;
    }
    return sum;
  }

  private _collapsed: boolean = false;
  set collapsed(isCollapsed: boolean) {
    if (this._collapsed != isCollapsed) {
      this.setHeight(isCollapsed ? this.expandedHeight : 0);
      this._collapsed = isCollapsed;
    }
  }
  get collapsed(): boolean {
    return this._collapsed;
  }

  constructor(public _elementRef: ElementRef) { }

  private setHeight(height: number) {
    this._elementRef.nativeElement.style.height = height + 'px';
  }

  public setCollapsedState(isCollapsed: boolean): void {
    this.collapsed = isCollapsed;
  }

}
