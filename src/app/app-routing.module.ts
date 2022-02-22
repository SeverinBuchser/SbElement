import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarExampleComponent } from "./calendar/calendar-example/calendar-example.component";
import { DefaultComponent } from "./default/default.component";
import { IndicatorExampleComponent } from "./indicator/indicator-example/indicator-example.component";
import { NotificationExampleComponent } from "./notification/notification-example/notification-example.component";
import { TableExampleComponent } from "./table/table-example/table-example.component";
import { TimelineExampleComponent } from "./timeline/timeline-example/timeline-example.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'example',
    pathMatch: 'full'
  },
  {
    path: 'example',
    component: DefaultComponent,
    children: [
      {
        path: 'indicator',
        component: IndicatorExampleComponent
      },
      {
        path: 'notification',
        component: NotificationExampleComponent
      },
      {
        path: 'timeline',
        component: TimelineExampleComponent
      },
      {
        path: 'calendar',
        component: CalendarExampleComponent
      },
      {
        path: 'table',
        component: TableExampleComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
