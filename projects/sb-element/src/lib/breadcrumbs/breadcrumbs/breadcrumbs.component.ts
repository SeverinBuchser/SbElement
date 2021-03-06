import { Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Color, mixinClassName, mixinColor, SbThemeService } from '../../core';

const SbBreadcrumbsCore = mixinColor(
  mixinClassName(
    class {
      constructor(
        public _elementRef: ElementRef,
        public _themeService: SbThemeService) {}
    }, 'sb-breadcrumbs'
  ), Color.PRIMARY
);

@Component({
  selector: 'sb-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'color'
  ]
})
export class SbBreadcrumbsComponent extends SbBreadcrumbsCore {

  @Output()
  public navigate: EventEmitter<string> = new EventEmitter<string>();

  private _crumbs: Array<string> = new Array<string>();

  get crumbs(): Array<string> {
    return this._crumbs;
  }

  @Input()
  public homePlaceholder: string = '';

  @Input()
  set url(url: string) {
    this._crumbs = url.split('/').reduce((
      crumbs: Array<string>,
      crumb: string,
      index: number
    ) => {
      if (index == 0 || crumb != '') crumbs.push(crumb);
      return crumbs;
    }, new Array<string>())
  }

  constructor(
    elementRef: ElementRef,
    themeService: SbThemeService
  ) {
    super(elementRef, themeService);
  }

  public handleClick(crumbIndex: number) {
    this.navigate.emit(this.crumbs.slice(0, crumbIndex + 1).join('/'));
  }


}
