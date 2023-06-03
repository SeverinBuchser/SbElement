import {
  Component,
  ContentChildren,
  ElementRef,
  Input,
  NgZone,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { take } from 'rxjs/operators';

import { hasElementRefClass, mixinClassName } from "../core";

import { SbTabComponent } from './tab.component';

const SbTabsCore = mixinClassName(hasElementRefClass, 'sb-tabs');

@Component({
  selector: 'sb-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SbTabsComponent extends SbTabsCore {

  @Input()
  public activeTabIndex: number = 0;

  @ContentChildren(SbTabComponent)
  public tabs!: QueryList<SbTabComponent>;

  constructor(
    elementRef: ElementRef,
    private _ngZone: NgZone
  ) {
    super(elementRef);
    this._ngZone.onStable.pipe(take(1)).subscribe(() => {
      this.setInitalTabPositions();
    });
  }

  private setInitalTabPositions(): void {
    this.tabs.forEach((tab: SbTabComponent, index: number) => {
      tab.position = index - this.activeTabIndex;
    })
  }

  public setActive(tabIndex: number): void {
    this.shiftTabPositions(this.activeTabIndex - tabIndex);
    this.activeTabIndex = tabIndex;
  }

  private shiftTabPositions(amount: number): void {
    this.tabs.forEach(tab => tab.position += amount)
  }

}
