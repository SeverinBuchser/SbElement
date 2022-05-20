import {
  AfterContentInit,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { mixinHide, SbCollapseDirective, Triggerable } from '../core';
import { SbCardComponent } from './card.component';

const SbExpansionCardCore = mixinHide(SbCardComponent);


@Component({
  selector: 'sb-expansion-card',
  templateUrl: './expansion-card.component.html',
  styleUrls: ['./expansion-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SbExpansionCardComponent extends SbExpansionCardCore
  implements Triggerable, AfterContentInit {

  public isOpen: boolean = false;

  @ViewChild(SbCollapseDirective, {read: ElementRef})
  public transitionElement!: ElementRef;

  @ViewChild(SbCollapseDirective)
  public collapse!: SbCollapseDirective;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  public trigger(): void {
    this.visible = !this.visible;
    this.collapse.setCollapsedState(this.visible);
  }

  ngAfterContentInit() {
    super.ngAfterContentInit();
    if (!this.header) {
      throw new Error("SbExpansionCardComponent: There is no header defined for the " + 
        "expansion card! The card cannot be expanded!");
    }
    this.header.hasAction = true;
    this.header._elementRef.nativeElement.addEventListener('click', () => {
      this.trigger();
    })
  }

}
