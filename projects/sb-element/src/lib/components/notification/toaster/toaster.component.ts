import { Component, ElementRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { mixinClassName } from "../../../core";
import { ToasterPosition } from "./toaster-position";

const SbToasterCore = mixinClassName(
  class {
    constructor(
      public _elementRef: ElementRef) {}
  }, 'sb-toaster'
);

@Component({
  selector: 'sb-toaster',
  templateUrl: './toaster.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SbToasterComponent extends SbToasterCore {

  @Input() @HostBinding('class')
  public position: string = ToasterPosition.TOP_LEFT;

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }

}
