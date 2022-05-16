import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from '../core';

const SbNavBarContentCore = mixinClassName(hasElementRefClass, 'sb-nav-bar-content');

@Component({
  selector: 'sb-nav-bar-content',
  templateUrl: './nav-bar-content.html',
  styleUrls: ['./nav-bar-content.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SbNavBarContentComponent extends SbNavBarContentCore {

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
