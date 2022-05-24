import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, Routes } from '@angular/router';
import { ExampleComponentt } from '../example/example.component';
import { DocService } from './doc.service';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss']
})
export class DocComponent {

  public routes: Routes = new Array();

  constructor(
    elementRef: ElementRef,
    private _docService: DocService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._docService.routes.subscribe((routes) => {
      this._route.routeConfig!.children = routes;

      this.routes = this._route.routeConfig!.children.reduce((routes, route) => {
        if (route.path != '') {
          routes.push(route);
        }
        return routes;
      }, new Array<Route>())
    })
  }

}
