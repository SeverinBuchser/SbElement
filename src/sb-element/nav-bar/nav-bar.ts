import {
  Component,
  ContentChildren,
  ElementRef,
  QueryList,
  ViewEncapsulation } from '@angular/core';
import {
  CanClassName,
  HasElementRef,
  hasElementRefClass,
  mixinClassName } from "../core";
import { SbContentPaginationDirective } from '../paginator';
import { SbNavBarContentComponent } from './nav-bar-content';

const SbNavBarCore = mixinClassName(hasElementRefClass, 'sb-nav-bar');

@Component({
  selector: 'sb-nav-bar',
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SbNavBarComponent extends SbNavBarCore
  implements CanClassName, HasElementRef {

  @ContentChildren(SbNavBarContentComponent)
  public contents: QueryList<SbNavBarContentComponent> = new QueryList();

  // FIX
  // currently no able to pass ng content to other component
  @ContentChildren(SbContentPaginationDirective, { descendants: true })
  public paginations: QueryList<SbContentPaginationDirective> = new QueryList();

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
