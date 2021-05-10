import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { PillComponent } from './components/pill/pill.component';
import { IconComponent } from './components/icon/icon.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    PillComponent,
    IconComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
