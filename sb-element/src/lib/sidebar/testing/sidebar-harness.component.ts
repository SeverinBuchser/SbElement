import { Component, ViewChild } from "@angular/core";
import { SbSidebarComponent } from "../sidebar";

@Component({
  template: `
  <sb-sidebar>
    <div>Some Title</div>
  </sb-sidebar>
  `
})
export class SidebarHarnessTest {
  @ViewChild(SbSidebarComponent)
  public component!: SbSidebarComponent;
}
