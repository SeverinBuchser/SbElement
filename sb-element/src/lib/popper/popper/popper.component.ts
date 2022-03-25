import { AfterViewInit, Component, ComponentRef, ContentChild, ElementRef, HostBinding, Input, OnDestroy, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { mixinClassName, Poppable, SbOverlayService, SbOverlayComponent } from '../../core/';
import { SbPopperContentComponent } from '../popper-content';
import { SbPopperOverlayComponent } from '../popper-overlay';

const SbPopperCore = mixinClassName(
  class {
    constructor(public _elementRef: ElementRef) {}
  }, 'sb-popper'
);

@Component({
  selector: 'sb-popper',
  templateUrl: './popper.component.html',
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'visible'
  ],
  outputs: [
    'show',
    'hide'
  ]
})
export class SbPopperComponent extends SbPopperCore implements Poppable, AfterViewInit, OnDestroy {

  @ContentChild(SbPopperContentComponent, {read: ElementRef})
  public content!: ElementRef;

  @ContentChild(SbPopperOverlayComponent)
  public popperOverlay!: SbPopperOverlayComponent;

  @ViewChild('overlayTemplate')
  public overlayTemplate!: TemplateRef<any>;

  private overlayRef: ComponentRef<SbOverlayComponent>;

  constructor(
    elementRef: ElementRef,
    private overlayService: SbOverlayService
  ) {
    super(elementRef);
    this.overlayRef = this.overlayService.create();
  }

  public trigger(): void {
    this.popperOverlay.trigger();
  }

  public ngAfterViewInit(): void {
    this.overlayRef.instance.createEmbeddedView(this.overlayTemplate);
    this.popperOverlay.showStart.subscribe(() => {
      let contentBBox = this.content.nativeElement.getBoundingClientRect();
      this.overlayRef.instance.setBoundingBox(contentBBox);
      this.popperOverlay.alignRelative(contentBBox);
    })
    this.popperOverlay.hideEnd.subscribe(() => {
      this.overlayRef.instance.reset();
    })
  }

  public ngOnDestroy(): void {
    this.overlayRef.destroy();
  }

  public getPopperRef(): ElementRef<any> {
    return this.popperOverlay._elementRef;
  }

  public isPopped(): boolean {
    return this.popperOverlay.visible;
  }

}
