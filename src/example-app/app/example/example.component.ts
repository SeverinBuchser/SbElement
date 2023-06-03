import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Route, Routes } from "@angular/router";
import { mixinClassName, mixinColor, Color } from 'sb-element';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ExampleComponentt extends
mixinColor(
  mixinClassName(
    class {
      constructor(public _elementRef: ElementRef) {}
    }, 'example'
  ), Color.PRIMARY
) {

  public toggle: boolean = false;

  public routes: Routes = [];

  constructor(
    elementRef: ElementRef,
    private route: ActivatedRoute
  ) {
    super(elementRef);

    if (this.route.routeConfig?.children) {
      this.routes = this.route.routeConfig?.children.reduce((routes, route) => {
        if (route.path != '') {
          routes.push(route);
        }
        return routes;
      }, new Array<Route>())
    }
  }

  public toCapitalCase(value: string | undefined): string {
    if (value) {
      let split = value.split('');
      split[0] = split[0].toUpperCase();
      return split.join('');
    } else return '';
  }
}
