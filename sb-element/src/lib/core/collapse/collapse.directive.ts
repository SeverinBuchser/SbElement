import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[sbCollapse]'
})
export class SbCollapseDirective implements AfterViewInit {

  get expandedHeight() {
    return this.host.nativeElement.children.item(0).offsetHeight;
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

  constructor(
    private host: ElementRef
  ) { }

  public ngAfterViewInit() {
    if (this.host.nativeElement.children.length != 1) {
      throw new Error(`There must be exactly one direct child of ${this.constructor.name}!`);
    }
  }

  private setHeight(height: number) {
    this.host.nativeElement.style.height = height + 'px';
  }

  public setCollapsedState(isCollapsed: boolean): void {
    this.collapsed = isCollapsed;
  }

}
