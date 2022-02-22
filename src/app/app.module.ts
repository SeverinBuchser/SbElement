import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { SbElementModule, SbStyleModule } from 'sb-element';
import { DefaultComponent } from './default/default.component';
import { IndicatorExampleComponent } from './indicator/indicator-example/indicator-example.component';
import { NotificationExampleComponent } from './notification/notification-example/notification-example.component';
import { TimelineExampleComponent } from './timeline/timeline-example/timeline-example.component';
import { CalendarExampleComponent } from './calendar/calendar-example/calendar-example.component';
import { TableExampleComponent } from './table/table-example/table-example.component';



@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    IndicatorExampleComponent,
    NotificationExampleComponent,
    TimelineExampleComponent,
    CalendarExampleComponent,
    TableExampleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SbElementModule,
    SbStyleModule.forRoot([
      {name: 'dark', href: 'sb-dark.css'},
      {name: 'neutral', href: 'sb-neutral.css'},
      {name: 'light', href: 'sb-light.css'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
