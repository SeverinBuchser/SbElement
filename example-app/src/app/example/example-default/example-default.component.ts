import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-example-default',
  templateUrl: './example-default.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ExampleDefaultComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
