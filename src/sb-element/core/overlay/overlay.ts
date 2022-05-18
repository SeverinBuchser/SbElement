import { TemplatePortal } from '@angular/cdk/portal';
import {
  Component, ElementRef,
  Input, TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {
  CanClassName,
  HasElementRef,
  hasElementRefClass,
  mixinClassName
} from '../common-behaviors';

const SbOverlayCore = mixinClassName(hasElementRefClass, 'sb-overlay');

@Component({
  selector: 'sb-overlay',
  templateUrl: './overlay.html',
  encapsulation: ViewEncapsulation.None,
})
export class SbOverlayComponent extends SbOverlayCore
  implements HasElementRef, CanClassName {

  @ViewChild('overlayTemplate', { static: true })
  public _implicitOverlayTemplate?: TemplateRef<any>;

  @Input('overlayTemplate')
  public _explicitOverlayTemplate?: TemplateRef<any>;

  @ViewChild('overlayPortal', { static: true, read: TemplatePortal })
  public _implicitOverlayPortal?: TemplatePortal;

  @Input('overlayPortal')
  public _explicitOverlayPortal?: TemplatePortal;

  private _overlayPortal?: TemplatePortal;
  get overlayPortal(): TemplatePortal | undefined {
    return this._overlayPortal;
  }

  constructor(
    elementRef: ElementRef,
    protected _viewContainerRef: ViewContainerRef,
  ) {
    super(elementRef);
  }

  public ngOnInit(): void {
    if (this._explicitOverlayPortal) {
      this._overlayPortal = this._explicitOverlayPortal;
    } else if (this._implicitOverlayPortal) {
      this._overlayPortal = this._implicitOverlayPortal;
    } else {
      let template = this._explicitOverlayTemplate || this._implicitOverlayTemplate;
      if (template) {
        this._overlayPortal = new TemplatePortal(
          template,
          this._viewContainerRef
        )
      }
    }
  }

}
