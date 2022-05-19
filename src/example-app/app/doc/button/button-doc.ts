import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-doc',
  template: `
    <app-module-doc>
      <app-button-example appExample></app-button-example>
      <app-button-api-doc appApiExample></app-button-api-doc>
    </app-module-doc>
  `
})
export class ButtonDocComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
