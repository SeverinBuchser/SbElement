import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SbCoreModule } from "../core";
import { SbSidebarComponent } from "./sidebar";
import { SbSidebarContainerComponent } from "./sidebar-container";

@NgModule({
  declarations: [
    SbSidebarComponent,
    SbSidebarContainerComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    SbCoreModule,
  ],
  exports: [SbSidebarComponent]
})
export class SbSidebarModule {

}