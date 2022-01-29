import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from "./default/default.component";
import { SBComponent } from "./sb/sb.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'example',
    pathMatch: 'full'
  },
  {
    path: 'example',
    component: DefaultComponent
  },
  {
    path: 'sb',
    component: SBComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
