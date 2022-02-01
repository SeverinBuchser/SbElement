import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ThemeInputDirective } from '../../core';

@Component({
  selector: 'sb-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbsComponent extends ThemeInputDirective {

  public rootClass = 'sb-breadcrumbs';

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

  public handleClick(crumb: string) {
    this.navigate.emit(crumb);
  }

}
