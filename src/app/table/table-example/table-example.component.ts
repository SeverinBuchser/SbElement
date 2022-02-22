import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-example',
  templateUrl: './table-example.component.html',
  styleUrls: ['./table-example.component.scss']
})
export class TableExampleComponent implements OnInit {

  public data: Array<Array<any>> = [[
    "Severin", "Buchser"
  ], [
    "Rafael", "Buchser"
  ],[
    null, "Buchser"
  ]];

  public head: Array<any> = ["Vorname", "Nachname"];

  constructor() { }

  ngOnInit(): void {
  }

}
