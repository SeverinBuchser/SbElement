import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from "./default/default.component";
import { SBComponent } from "./sb/sb.component";

const routes: Routes = [
  {
    path: '',
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
