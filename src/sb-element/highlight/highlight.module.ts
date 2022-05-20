import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { SbCoreModule } from '../core';
import { SbIconModule } from '../icon';
import { SbPopperModule } from '../popper';
import { SbButtonModule } from '../button';

import { SbHighlightComponent } from './highlight.component';
import {
  SbHighlightModuleConfig,
  SB_HIGHLIGHT_CONFIG,
  SB_HIGHLIGHT_CONFIG_DEFAULT
} from './highlight.module.config';

@NgModule({
  declarations: [SbHighlightComponent],
  imports: [
    ClipboardModule,
    CommonModule,
    SbCoreModule,
    SbButtonModule,
    SbIconModule,
    SbPopperModule,
  ],
  exports: [SbHighlightComponent],
  providers: [
    { provide: SB_HIGHLIGHT_CONFIG, useValue: SB_HIGHLIGHT_CONFIG_DEFAULT }
  ]
})
export class SbHighlightModule {
  public static forRoot(
    config: Partial<SbHighlightModuleConfig>
  ): ModuleWithProviders<SbHighlightModule> {
    return {
      ngModule: SbHighlightModule,
      providers: [
        { provide: SB_HIGHLIGHT_CONFIG, useValue: {
          ...SB_HIGHLIGHT_CONFIG_DEFAULT,
          ...config
        }}
      ]
    }
  }
}
