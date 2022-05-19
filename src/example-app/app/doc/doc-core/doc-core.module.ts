import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiDocDirective } from './api-doc';
import { ExampleDirective } from './example';
import { ModuleDocComponent } from './module-doc';
import { SbTabsModule } from 'sb-element';

@NgModule({
  declarations: [
    ApiDocDirective,
    ExampleDirective,
    ModuleDocComponent
  ],
  imports: [
    CommonModule,
    SbTabsModule
  ],
  exports: [
    ApiDocDirective,
    ExampleDirective,
    ModuleDocComponent
  ]
})
export class DocCoreModule { }
