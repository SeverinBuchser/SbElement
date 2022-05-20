import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-doc',
  template: `
    <app-module-doc>
      <app-card-example appExample></app-card-example>
      <app-card-api-doc appApiExample></app-card-api-doc>
    </app-module-doc>
  `
})
export class CardDocComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
