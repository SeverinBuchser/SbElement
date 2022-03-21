import { AfterContentInit, Attribute, Component, ElementRef, Optional, ViewChild, ViewEncapsulation } from '@angular/core';
import { SbCardComponent } from '../card';
import { mixinHide, SbCollapseDirective, Triggerable } from '../../core';

const SbExpansionCardCore = mixinHide(SbCardComponent);


@Component({
  selector: 'sb-expansion-card',
  templateUrl: './expansion-card.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SbExpansionCardComponent extends SbExpansionCardCore implements Triggerable, AfterContentInit {

  public isOpen: boolean = false;

  @ViewChild(SbCollapseDirective, {read: ElementRef})
  public transitionElement!: ElementRef;

  @ViewChild(SbCollapseDirective)
  public collapse!: SbCollapseDirective;

  constructor(
    elementRef: ElementRef,
    @Optional() @Attribute('hover') hover: any,
    @Optional() @Attribute('shadow') shadow: any
  ) {
    super(elementRef, hover, shadow);
  }

  public trigger(): void {
    this.visible = !this.visible;
    this.collapse.setCollapsedState(this.visible);
  }

  ngAfterContentInit() {
    super.ngAfterContentInit();
    if (!this.header) {
      throw new Error("There is no header defined for the expansion card! The card cannot be expanded!")
    }
    this.header.hasAction = true;
    this.header._elementRef.nativeElement.addEventListener('click', () => {
      this.trigger();
    })
  }

}
