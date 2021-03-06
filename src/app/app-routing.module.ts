import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarExampleComponent } from "./example/calendar/calendar-example/calendar-example.component";
import { HomeComponent } from "./home/home.component";
import { IndicatorExampleComponent } from "./example/indicator/indicator-example/indicator-example.component";
import { NotificationExampleComponent } from "./example/notification/notification-example/notification-example.component";
import { TableExampleComponent } from "./example/table/table-example/table-example.component";
import { TimelineExampleComponent } from "./example/timeline/timeline-example/timeline-example.component";
import { ExampleComponent } from "./example/example.component";
import { FormExampleComponent } from "./example/form/form-example/form-example.component";
import { PopperExampleComponent } from "./example/popper/popper-example/popper-example.component";
import { TypographyExampleComponent } from "./example/typography/typography-example/typography-example.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'example',
        component: ExampleComponent,
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
          },
          {
            path: 'form',
            component: FormExampleComponent
          },
          {
            path: 'popper',
            component: PopperExampleComponent
          },
          {
            path: 'typography',
            component: TypographyExampleComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
