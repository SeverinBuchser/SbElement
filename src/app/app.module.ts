import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { IconComponent } from './components/icon/icon.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { ToggleSwitchComponent } from './components/toggle-switch/toggle-switch.component';
import { FormsModule } from '@angular/forms';
import { BaseModule } from './components/base/base.module';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    IconComponent,
    IconButtonComponent,
    ToggleSwitchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
