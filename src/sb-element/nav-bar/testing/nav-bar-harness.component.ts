import { Component, ViewChild } from '@angular/core';
import { SbNavBarComponent } from '../nav-bar.component';

@Component({
  template: `
  <sb-nav-bar>
    <sb-nav-bar-content>
      <div>Some Title</div>
    </sb-nav-bar-content>
    <sb-nav-bar-content>
      <div>Some other content</div>
			<div sbContentPagination></div>
    </sb-nav-bar-content>
  </sb-nav-bar>
  `
})
export class NavBarHarnessTest {
  @ViewChild(SbNavBarComponent)
  public component!: SbNavBarComponent;
}
