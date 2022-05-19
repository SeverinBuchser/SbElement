import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-doc',
  template: `
    <app-module-doc>
      <app-alert-example appExample></app-alert-example>
      <app-alert-api-doc appApiExample></app-alert-api-doc>
    </app-module-doc>
  `
})
export class AlertDocComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
