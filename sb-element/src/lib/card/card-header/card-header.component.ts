import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from '../../core';

const SbCardHeaderCore = mixinClassName(hasElementRefClass, 'sb-card-header');

@Component({
  selector: 'sb-card-header',
  templateUrl: './card-header.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.has-action]': 'hasAction'
  }
})
export class SbCardHeaderComponent extends SbCardHeaderCore {

  @Input()
  public hasAction: boolean = false;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
