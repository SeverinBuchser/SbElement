import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { SbElementModule } from 'sb-element';
import { SBComponent } from './sb/sb.component';
import { DefaultComponent } from './default/default.component';



@NgModule({
  declarations: [
    AppComponent,
    SBComponent,
    DefaultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SbElementModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
