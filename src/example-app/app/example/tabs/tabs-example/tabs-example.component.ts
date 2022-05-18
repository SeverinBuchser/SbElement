import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs-example',
  templateUrl: './tabs-example.component.html',
  styleUrls: ['./tabs-example.component.scss']
})
export class TabsExampleComponent implements OnInit {

  tabLabels = [
    "Label 1",
    "Label 2",
    "Label 3",
    "Label 4",
    "Label 5",
    "Label 6",
    "Label 7",
    "Label 8",
    "Label 10",
    "Label 11",
    "Label 12",
  ]

  activeTabLabel = this.tabLabels[0];

  constructor() { }

  ngOnInit(): void {
  }

  handleActivate(tabLabel: string): void {
    this.activeTabLabel = tabLabel;
  }

}
