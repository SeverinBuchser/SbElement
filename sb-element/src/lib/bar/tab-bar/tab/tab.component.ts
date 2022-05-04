import { Component, ElementRef, EventEmitter, HostBinding, Optional, Output, ViewEncapsulation } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { mixinClassName } from "../../../core";

const SbTabCore = mixinClassName(
  class {
    constructor(public _elementRef: ElementRef) {}
  }, 'sb-tab'
);


@Component({
  selector: 'sb-tab',
  templateUrl: './tab.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SbTabComponent extends SbTabCore {

  @Output()
  public isActiveChange: EventEmitter<boolean> = new EventEmitter();

  private _isActive: boolean = false;
  @HostBinding('class.active')
  get isActive(): boolean {
    return this._isActive;
  }
  set isActive(isActive: boolean) {
    this._isActive = isActive;
    this.isActiveChange.emit(isActive);
  }

  constructor(
    elementRef: ElementRef,
    @Optional() private routerActiveLink?: RouterLinkActive
  ) {
    super(elementRef);
    if (this.routerActiveLink) {
      this.routerActiveLink.isActiveChange.subscribe(isActive => this.isActive = isActive);
    }
  }

}
