import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Color, mixinClassName, mixinColor, mixinHide, SbCollapseDirective } from '../../core';

const SbExpansionCardCore = mixinHide(
  mixinColor(
    mixinClassName(
      class {
        constructor(public _elementRef: ElementRef) {}
      }, 'sb-expansion-card'
    ), Color.PRIMARY
  )
);


@Component({
  selector: 'sb-expansion-card',
  templateUrl: './expansion-card.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '(click)': 'handleClick()'
  }
})
export class SbExpansionCardComponent extends SbExpansionCardCore {

  public isOpen: boolean = false;

  @ViewChild(SbCollapseDirective, {read: ElementRef})
  public transitionElement!: ElementRef;

  @ViewChild(SbCollapseDirective)
  public collapse!: SbCollapseDirective;

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }

  public handleClick(): void {
    this.visible = !this.visible;
    this.collapse.setCollapsedState(this.visible);
  }

}
