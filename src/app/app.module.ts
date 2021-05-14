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
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { RadioButtonGroupComponent } from './components/group/radio-button/radio-button-group.component';
import { CheckboxGroupComponent } from './components/group/checkbox/checkbox-group.component';
import { ControlValueAccessorBase } from './components/group/base/control-value-accessor.base.directive';
import { SelectionOptionsDirective } from './components/group/base/selection-options.directive';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    IconComponent,
    IconButtonComponent,
    ToggleSwitchComponent,
    CheckboxComponent,
    RadioButtonComponent,
    RadioButtonGroupComponent,
    CheckboxGroupComponent,
    ControlValueAccessorBase,
    SelectionOptionsDirective,
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
