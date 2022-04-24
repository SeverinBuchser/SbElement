import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { mixinClassName } from '../../core';

const SbCardContentCore = mixinClassName(
  class {
    constructor(public _elementRef: ElementRef) {}
  }, 'sb-card-content'
);

@Component({
  selector: 'sb-card-content',
  templateUrl: './card-content.component.html'
})
export class SbCardContentComponent extends SbCardContentCore {

  @Input()
  public showTopDivider: boolean = false;

  get classes(): Array<string> {
    return this._elementRef.nativeElement.classList;
  }

  @ViewChild(TemplateRef, { static: true })
  public template!: TemplateRef<any>;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
