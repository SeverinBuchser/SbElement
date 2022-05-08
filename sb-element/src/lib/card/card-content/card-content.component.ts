import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { hasElementRefClass, mixinClassName } from '../../core';

const SbCardContentCore = mixinClassName(hasElementRefClass, 'sb-card-content');

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
