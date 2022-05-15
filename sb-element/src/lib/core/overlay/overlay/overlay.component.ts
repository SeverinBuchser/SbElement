import { PortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  ComponentRef,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation } from '@angular/core';
import {
  CanClassName,
  HasElementRef,
  hasElementRefClass,
  mixinClassName } from '../../common-behaviors';
import { SbOverlayOutletComponent } from '../overlay-outlet';
import { SbOverlayService } from '../overlay.service';

const SbOverlayCore = mixinClassName(hasElementRefClass, 'sb-overlay');

@Component({
  selector: 'sb-overlay',
  templateUrl: './overlay.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SbOverlayComponent extends SbOverlayCore
  implements HasElementRef, CanClassName, PortalOutlet, OnInit, OnDestroy {

  @ViewChild('overlayTemplate', { static: true })
  public _implicitOverlayTemplate?: TemplateRef<any>;

  @Input('overlayTemplate')
  public _explicitOverlayTemplate?: TemplateRef<any>;

  @ViewChild('overlayPortal', { static: true, read: TemplatePortal })
  public _implicitOverlayPortal?: TemplatePortal;

  @Input('overlayPortal')
  public _explicitOverlayPortal?: TemplatePortal;

  protected _overlayOutletRef!: ComponentRef<SbOverlayOutletComponent>;

  private _overlayPortal?: TemplatePortal;
  get overlayPortal(): TemplatePortal | undefined {
    return this._overlayPortal;
  }

  constructor(
    elementRef: ElementRef,
    private _overlayService: SbOverlayService,
    protected _viewContainerRef: ViewContainerRef,
  ) {
    super(elementRef);
    this._overlayOutletRef = this._overlayService.create(SbOverlayOutletComponent);
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

  public ngOnDestroy(): void {
    this._overlayOutletRef.destroy();
  }

  public attach(): any {
    if (this.hasPortal()) {
      this._overlayOutletRef.instance.attach(this.overlayPortal);
    } else {
      throw new Error("No portal to attach to outlet!")
    }
  }

  public detach() {
    this._overlayOutletRef.instance.detach();
  }

  public dispose(): void {
    this._overlayOutletRef.instance.dispose();
  }

  public hasAttached(): boolean {
    return this._overlayOutletRef.instance.hasAttached();
  }

  public hasPortal(): boolean {
    return this.overlayPortal ? true : false;
  }

}
