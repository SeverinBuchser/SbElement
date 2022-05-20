import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container-doc',
  template: `
    <app-module-doc>
      <app-container-example appExample></app-container-example>
      <app-container-api-doc appApiExample></app-container-api-doc>
    </app-module-doc>
  `
})
export class ContainerDocComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
