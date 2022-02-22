import { Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { mixinClassName, mixinTheme, SbThemeService } from '../../core';

const SbBreadcrumbsCore = mixinTheme(
  mixinClassName(
    class {
      constructor(
        public _elementRef: ElementRef,
        public _themeService: SbThemeService) {}
    }, 'sb-breadcrumbs'
  )
);

@Component({
  selector: 'sb-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SbBreadcrumbsComponent extends SbBreadcrumbsCore {

  @Output()
  public navigate: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

  private _crumbs: Array<string> = new Array<string>();

  @Input()
  set crumbs(crumbs: Array<string>) {
    this._crumbs = crumbs;
  }

  get crumbs(): Array<string> {
    return this._crumbs;
  }

  @Input()
  set url(url: string) {
    this._crumbs = url.split('/');
  }

  constructor(
    elementRef: ElementRef,
    themeService: SbThemeService
  ) {
    super(elementRef, themeService);
  }

  public handleClick(crumbIndex: number) {
    this.navigate.emit(this.crumbs.slice(0, crumbIndex + 1));
  }

}
