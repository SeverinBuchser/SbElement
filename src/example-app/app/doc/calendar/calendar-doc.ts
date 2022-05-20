import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-doc',
  template: `
    <app-module-doc>
      <app-calendar-example appExample></app-calendar-example>
      <app-calendar-api-doc appApiExample></app-calendar-api-doc>
    </app-module-doc>
  `
})
export class CalendarDocComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
