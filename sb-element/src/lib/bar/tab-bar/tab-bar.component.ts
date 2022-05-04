import { AfterContentInit, Component, ContentChildren, ElementRef, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { SbTabComponent } from './tab';
import { mixinClassName, SbAlignDirective } from "../../core";

const SbTabBarCore = mixinClassName(
  class {
    constructor(public _elementRef: ElementRef) {}
  }, 'sb-tab-bar'
);


@Component({
  selector: 'sb-tab-bar',
  templateUrl: './tab-bar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SbTabBarComponent extends SbTabBarCore implements AfterContentInit {

  @ContentChildren(SbTabComponent)
  public tabs!: QueryList<SbTabComponent>;

  @ViewChild(SbAlignDirective, { static: true })
  public activeUnderlay!: SbAlignDirective;

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }

  public ngAfterContentInit() {
    this.tabs.forEach((tab: SbTabComponent) => tab.isActiveChange.subscribe((isActive: boolean) => {
      if (isActive) {
        let tabBBox = tab._elementRef.nativeElement.getBoundingClientRect();
        this.activeUnderlay.setHeight(tabBBox.height);
        this.activeUnderlay.setWidth(tabBBox.width);
        this.activeUnderlay.moveBy(tabBBox.x, 0);
      }
    }))
  }



}
