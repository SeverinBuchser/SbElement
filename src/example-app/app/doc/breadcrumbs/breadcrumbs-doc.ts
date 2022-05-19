import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs-doc',
  template: `
    <app-module-doc>
      <app-breadcrumbs-example appExample></app-breadcrumbs-example>
      <app-breadcrumbs-api-doc appApiExample></app-breadcrumbs-api-doc>
    </app-module-doc>
  `
})
export class BreadcrumbsDocComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
