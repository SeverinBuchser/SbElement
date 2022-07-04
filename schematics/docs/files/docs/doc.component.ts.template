import { Component } from '@angular/core';
import { ActivatedRoute, Route, Routes } from '@angular/router';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss']
})
export class DocComponent {

  public routes: Routes = new Array();

  constructor(private route: ActivatedRoute) {
    if (this.route.routeConfig?.children) {
      this.routes = this.route.routeConfig?.children.reduce((routes, route) => {
        if (route.path != '') {
          routes.push(route);
        }
        return routes;
      }, new Array<Route>())
    }
  }

}
