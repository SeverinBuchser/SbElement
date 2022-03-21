import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-example',
  templateUrl: './table-example.component.html',
  styleUrls: ['./table-example.component.scss']
})
export class TableExampleComponent implements OnInit {

  public data: Array<Array<any>> = [[
    "Jhon", "Doe"
  ], [
    "Any", "Body"
  ],[
    null, "Noone"
  ]];

  public head: Array<any> = ["Name", "Surname"];

  constructor() { }

  ngOnInit(): void {
  }

}
