import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SbElementModule } from 'sb-element';
import { AlertExampleComponent } from './alert';
import { BreadcrumbsExampleComponent } from './breadcrumbs';
import { ButtonExampleComponent } from './button';
import { CalendarExampleComponent } from './calendar';
import { CardExampleComponent } from './card';
import { ContainerExampleComponent } from './container';
import { FileInputExampleComponent } from './file-input';
import { GridExampleComponent } from './grid';

@NgModule({
  declarations: [
    AlertExampleComponent,
    BreadcrumbsExampleComponent,
    ButtonExampleComponent,
    CalendarExampleComponent,
    CardExampleComponent,
    ContainerExampleComponent,
    FileInputExampleComponent,
    GridExampleComponent
  ],
  imports: [
    CommonModule,
    SbElementModule
  ],
  exports: [
    AlertExampleComponent,
    BreadcrumbsExampleComponent,
    ButtonExampleComponent,
    CalendarExampleComponent,
    CardExampleComponent,
    ContainerExampleComponent,
    FileInputExampleComponent,
    GridExampleComponent
  ]
})
export class ExampleModule { }
