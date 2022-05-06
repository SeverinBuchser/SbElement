import { Component, ElementRef, EventEmitter, Input, NgZone, Optional, Output, ViewEncapsulation } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { SbContentPaginationDirective } from '../../paginator';
import { mixinClassName } from "../../core";
import { take } from 'rxjs/operators';

const SbTabLabelCore = mixinClassName(
  SbContentPaginationDirective, 'sb-tab-label'
);


@Component({
  selector: 'sb-tab-label',
  templateUrl: './tab-label.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.active]': 'isActive'
  }
})
export class SbTabLabelComponent extends SbTabLabelCore {

  @Output()
  public isActiveChange: EventEmitter<boolean> = new EventEmitter();
  
  private _isActive: boolean = false;
  @Input()
  get isActive(): boolean {
    return this._isActive;
  }
  set isActive(isActive: boolean) {
    if (this._isActive != isActive) {
      this._isActive = isActive;
      this.isActiveChange.emit(isActive);
    }
  }

  constructor(
    elementRef: ElementRef,
    private _ngZone: NgZone,
    @Optional() private routerActiveLink?: RouterLinkActive
  ) {
    super(elementRef);
    if (this.routerActiveLink) {
      this.routerActiveLink.isActiveChange.subscribe(isActive => this.isActive = isActive);
    }
    this._ngZone.onStable.pipe(take(1)).subscribe(() => {
      this.isActiveChange.emit(this.isActive);
    });
  }

}
