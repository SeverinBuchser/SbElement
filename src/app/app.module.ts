import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { SbElementModule, SbStyleModule } from 'sb-element';
import { IndicatorExampleComponent } from './example/indicator/indicator-example/indicator-example.component';
import { NotificationExampleComponent } from './example/notification/notification-example/notification-example.component';
import { TimelineExampleComponent } from './example/timeline/timeline-example/timeline-example.component';
import { CalendarExampleComponent } from './example/calendar/calendar-example/calendar-example.component';
import { TableExampleComponent } from './example/table/table-example/table-example.component';
import { HomeComponent } from './home/home.component';
import { ExampleComponent } from './example/example.component';
import { FormExampleComponent } from './example/form/form-example/form-example.component';
import { PopperExampleComponent } from './example/popper/popper-example/popper-example.component';
import { TypographyExampleComponent } from './example/typography/typography-example/typography-example.component';



@NgModule({
  declarations: [
    AppComponent,
    IndicatorExampleComponent,
    NotificationExampleComponent,
    TimelineExampleComponent,
    CalendarExampleComponent,
    TableExampleComponent,
    HomeComponent,
    ExampleComponent,
    FormExampleComponent,
    PopperExampleComponent,
    TypographyExampleComponent,
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
