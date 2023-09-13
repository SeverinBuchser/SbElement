import {
  Component,
  ElementRef,
  EventEmitter,
  NgZone,
  Optional,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { take } from 'rxjs/operators';

import { mixinClassName } from "../core";
import { SbContentPaginationDirective } from '../paginator';

const SbTabLabelCore = mixinClassName(SbContentPaginationDirective, 'sb-tab-label');


/**
 * Only activates from within and only deactivates from outside
 */
@Component({
  selector: 'sb-tab-label',
  templateUrl: './tab-label.component.html',
  styleUrls: ['./tab-label.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.active]': 'isActive'
  }
})
export class SbTabLabelComponent extends SbTabLabelCore {

  @Output()
  public activate: EventEmitter<void> = new EventEmitter();

  @Output()
  public deactivate: EventEmitter<void> = new EventEmitter();

  private _isActive: boolean = false;
  get isActive(): boolean {
    return this._isActive;
  }

  constructor(
    elementRef: ElementRef,
    private _ngZone: NgZone
  ) {
    super(elementRef);
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this._emit());
  }

  public setActive(isActive: boolean): void {
    if (this._isActive != isActive) {
      this._isActive = isActive;
      this._emit();
    }
  }

  private _emit(): void {
    if (this._isActive) this.activate.emit();
    else this.deactivate.emit();
  }

}
