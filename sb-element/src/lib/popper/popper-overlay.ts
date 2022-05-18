import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewChild,
  ViewEncapsulation } from '@angular/core';
import {
  hasElementRefClass,
  mixinClassName,
  SbAlignRelateiveDirective,
  SbConnectedSide } from '../core';

const SbPopperOverlayCore = mixinClassName(hasElementRefClass, 'sb-popper-overlay');

@Component({
  selector: 'sb-popper-overlay',
  templateUrl: './popper-overlay.html',
  styleUrls: ['./popper-overlay.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SbPopperOverlayComponent extends SbPopperOverlayCore {

  @Input() @HostBinding('class')
  public position: SbConnectedSide = 'bottom';

  @ViewChild('arrow', { read: SbAlignRelateiveDirective, static: true })
  public arrow!: SbAlignRelateiveDirective;

  get viewBox(): string {
    if (this.position == 'left') {
      return "0 0 1000 2000";
    } else if (this.position == 'right') {
      return "0 0 1000 2000";
    } else if (this.position == 'top') {
      return "0 0 2000 1000";
    } else if (this.position == 'bottom') {
      return "0 0 2000 1000";
    }
    return "";
  }

  get arrowPath(): string {
    if (this.position == 'left') {
      return "M 0, 0 L 1000, 1000 L 0, 2000 Z";
    } else if (this.position == 'right') {
      return "M 1000, 0 L 0, 1000 L 1000, 2000 Z";
    } else if (this.position == 'top') {
      return "M 0, 0 L 1000, 1000 L 2000, 0 Z";
    } else if (this.position == 'bottom') {
      return "M 0, 1000 L 1000, 0 L 2000, 1000 Z";
    }
    return "";
  }

  constructor(
    elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    super(elementRef);
  }

  public setPositionClass(position: SbConnectedSide): void {
    this._elementRef.nativeElement.classList.remove(this.position);
		this._elementRef.nativeElement.classList.add(position);
    this.position = position;
    this._changeDetectorRef.detectChanges();
  }

}
