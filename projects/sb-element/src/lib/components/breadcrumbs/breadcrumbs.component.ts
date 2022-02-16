import { Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { mixinClassName, mixinTheme, ThemeService } from '../../core';

const SbBreadcrumbsCore = mixinTheme(
  mixinClassName(
    class {
      constructor(
        public _elementRef: ElementRef,
        public _themeService: ThemeService) {}
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
  public navigate: EventEmitter<string> = new EventEmitter<string>();

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
    themeService: ThemeService
  ) {
    super(elementRef, themeService);
  }

  public handleClick(crumb: string) {
    this.navigate.emit(crumb);
  }

}
