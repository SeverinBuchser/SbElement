import { Component, ElementRef } from '@angular/core';
import { Color, mixinClassName, mixinColor } from '../../core';

const SbExpansionCardCore = mixinColor(
  mixinClassName(
    class {
      constructor(public _elementRef: ElementRef) {}
    }, 'sb-expansion-card'
  ), Color.PRIMARY
);


@Component({
  selector: 'sb-expansion-card',
  templateUrl: './expansion-card.component.html'
})
export class SbExpansionCardComponent extends SbExpansionCardCore {

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }

}
